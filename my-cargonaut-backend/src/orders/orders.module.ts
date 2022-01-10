import { Module } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { Location } from "./entities/location.entity";
import { Rating } from "./entities/rating.entity";
import { OffersModule } from "../offers/offers.module";
import { RequestsModule } from "../requests/requests.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Order, Location, Rating]),
        OffersModule,
        RequestsModule,
    ],
    controllers: [OrdersController],
    providers: [OrdersService],
    exports: [OrdersService],
})
export class OrdersModule {}
