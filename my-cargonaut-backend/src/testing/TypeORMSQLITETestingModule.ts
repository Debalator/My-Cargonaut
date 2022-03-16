import { TypeOrmModule } from "@nestjs/typeorm";
import { Address } from "../addresses/entities/address.entity";
import { User } from "../users/entities/user.entity";
import { Offer } from "../offers/entities/offer.entity";
import { Request } from "../requests/entities/request.entity";
import { Vehicle } from "../vehicles/entities/vehicle.entity";
import { Order } from "../orders/entities/order.entity";
import { Item } from "../requests/entities/item.entity";
import { Rating } from "../orders/entities/rating.entity";
import { Location } from "../orders/entities/location.entity";

export const TypeOrmSQLITETestingModule = () => [
    TypeOrmModule.forRoot({
        type: "mariadb",
        database: "unit_test",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "root",
        synchronize: true,
        entities: ["dist/**/*.entity{.ts,.js}"],
        keepConnectionAlive: true,
        dropSchema: true,
    }),
    TypeOrmModule.forFeature([
        Address,
        User,
        Offer,
        Request,
        Vehicle,
        Order,
        Item,
        Rating,
        Location,
    ]),
];
