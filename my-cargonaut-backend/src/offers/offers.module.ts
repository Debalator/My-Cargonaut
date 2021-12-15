import { Module } from "@nestjs/common";
import { OffersService } from "./offers.service";
import { OffersController } from "./offers.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Offer } from "./entities/offer.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Offer])],
    controllers: [OffersController],
    providers: [OffersService],
})
export class OffersModule {}
