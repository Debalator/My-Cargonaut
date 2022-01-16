import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from "@nestjs/common";
import { AddressesService } from "./addresses.service";
import { CreateAddressDto } from "./dto/create-address.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("addresses")
export class AddressesController {
    constructor(private readonly addressesService: AddressesService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createAddressDto: CreateAddressDto) {
        return this.addressesService.create(createAddressDto);
    }

    @Get()
    findAll() {
        return this.addressesService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.addressesService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(":id")
    update(
        @Param("id") id: string,
        @Body() updateAddressDto: UpdateAddressDto
    ) {
        return this.addressesService.update(+id, updateAddressDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.addressesService.remove(+id);
    }
}
