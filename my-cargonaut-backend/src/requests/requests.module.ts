import { forwardRef, Module } from "@nestjs/common";
import { RequestsService } from "./requests.service";
import { RequestsController } from "./requests.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Request } from "./entities/request.entity";
import { Item } from "./entities/item.entity";
import { AddressesModule } from "../addresses/addresses.module";
import { OffersModule } from "../offers/offers.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Request, Item]),
        AddressesModule,
        forwardRef(() => OffersModule),
    ],
    controllers: [RequestsController],
    providers: [RequestsService],
    exports: [RequestsService],
})
export class RequestsModule {}
