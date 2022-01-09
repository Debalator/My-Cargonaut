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
    Inject,
    forwardRef,
} from "@nestjs/common";
import { OffersService } from "./offers.service";
import { CreateOfferDto } from "./dto/create-offer.dto";
import { UpdateOfferDto } from "./dto/update-offer.dto";
import { AddressesService } from "../addresses/addresses.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateRequestFromOfferDto } from "../requests/dto/create-request-from-offer.dto";
import { CreateOfferFromRequestDto } from "./dto/create-offer-from-request.dto";
import { Offer } from "./entities/offer.entity";

@Controller("offers")
export class OffersController {
    constructor(
        private readonly offersService: OffersService,
        private readonly addressService: AddressesService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Request() req, @Body() createOfferDto: CreateOfferDto) {
        const startAddress = await this.addressService.create(
            createOfferDto.startAddress
        );
        const destAddress = await this.addressService.create(
            createOfferDto.destAddress
        );

        return this.offersService.create({
            ...createOfferDto,
            creator: req.user.id,
            startAddress,
            destAddress,
        });
    }

    @Get()
    findAll() {
        return this.offersService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.offersService.findOne(+id);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateOfferDto: UpdateOfferDto) {
        return this.offersService.update(+id, updateOfferDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.offersService.remove(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Post("/requests/:id")
    createFromOffer(
        @Request() req,
        @Param("id") id: string,
        @Body() createOfferFromRequestDto: CreateOfferFromRequestDto
    ) {
        return this.offersService.createFromRequest(
            {
                ...createOfferFromRequestDto,
                creator: req.user.id,
            },
            +id
        );
    }
}
