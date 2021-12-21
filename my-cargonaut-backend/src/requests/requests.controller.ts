import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from "@nestjs/common";
import { RequestsService } from "./requests.service";
import { CreateRequestDto } from "./dto/create-request.dto";
import { UpdateRequestDto } from "./dto/update-request.dto";
import { AddressesService } from "../addresses/addresses.service";

@Controller("requests")
export class RequestsController {
    constructor(
        private readonly requestsService: RequestsService,
        private readonly addressService: AddressesService
    ) {}

    @Post()
    async create(@Body() createRequestDto: CreateRequestDto) {
        const startAddress = await this.addressService.create(
            createRequestDto.startAddress
        );
        const destAddress = await this.addressService.create(
            createRequestDto.destAddress
        );

        return this.requestsService.create({
            ...createRequestDto,
            startAddress,
            destAddress,
        });
    }

    @Get()
    findAll() {
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
}
