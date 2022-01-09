import { forwardRef, Module } from "@nestjs/common";
import { OffersService } from "./offers.service";
import { OffersController } from "./offers.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Offer } from "./entities/offer.entity";
import { AddressesModule } from "../addresses/addresses.module";
import { RequestsModule } from "../requests/requests.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Offer]),
        AddressesModule,
        forwardRef(() => RequestsModule),
    ],
    controllers: [OffersController],
    providers: [OffersService],
    exports: [OffersService],
})
export class OffersModule {}
