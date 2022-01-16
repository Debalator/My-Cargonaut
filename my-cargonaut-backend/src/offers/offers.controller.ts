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
} from "@nestjs/common";
import { OffersService } from "./offers.service";
import { CreateOfferDto } from "./dto/create-offer.dto";
import { UpdateOfferDto } from "./dto/update-offer.dto";
import { AddressesService } from "../addresses/addresses.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

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
        return this.offersService.findAll({
            active: true,
        });
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.offersService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(":id")
    update(@Param("id") id: string, @Body() updateOfferDto: UpdateOfferDto) {
        return this.offersService.update(+id, updateOfferDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.offersService.remove(+id);
    }
}
