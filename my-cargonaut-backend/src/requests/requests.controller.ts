import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Request,
    Query,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RequestsService } from "./requests.service";
import { CreateRequestDto } from "./dto/create-request.dto";
import { UpdateRequestDto } from "./dto/update-request.dto";
import { AddressesService } from "../addresses/addresses.service";
import { CreateRequestFromOfferDto } from "./dto/create-request-from-offer.dto";

@Controller("requests")
export class RequestsController {
    constructor(
        private readonly requestsService: RequestsService,
        private readonly addressService: AddressesService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Request() req, @Body() createRequestDto: CreateRequestDto) {
        const startAddress = await this.addressService.create(
            createRequestDto.startAddress
        );
        const destAddress = await this.addressService.create(
            createRequestDto.destAddress
        );

        return this.requestsService.create({
            ...createRequestDto,
            creator: req.user.sub,
            startAddress,
            destAddress,
        });
    }

    @Get()
    findAll(@Query("creator") creator: number) {
        if (creator) return this.requestsService.findAllByCreator(creator);
        return this.requestsService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.requestsService.findOne(+id);
    }

    @Patch(":id")
    update(
        @Param("id") id: string,
        @Body() updateRequestDto: UpdateRequestDto
    ) {
        return this.requestsService.update(+id, updateRequestDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.requestsService.remove(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Post("/offers/:id")
    createFromOffer(
        @Request() req,
        @Param("id") id: string,
        @Body() createRequestFromOfferDto: CreateRequestFromOfferDto
    ) {
        return this.requestsService.createFromOffer(
            {
                ...createRequestFromOfferDto,
                creator: req.user.sub,
            },
            +id
        );
    }
}
