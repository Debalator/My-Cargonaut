import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { TypeOrmSQLITETestingModule } from "../testing/TypeORMSQLITETestingModule";
import { AddressesService } from "../addresses/addresses.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Address } from "../addresses/entities/address.entity";
import { User } from "./entities/user.entity";
import { Offer } from "../offers/entities/offer.entity";
import { Request } from "../requests/entities/request.entity";
import { Vehicle } from "../vehicles/entities/vehicle.entity";
import { Order } from "../orders/entities/order.entity";
import { Item } from "../requests/entities/item.entity";
import { Location } from "../orders/entities/location.entity";
import { Rating } from "../orders/entities/rating.entity";

describe("UsersService", () => {
    let moduleRef: TestingModule;
    let service: UsersService;

    beforeAll(async () => {
        moduleRef = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forFeature([
                    User,
                    Offer,
                    Vehicle,
                    Address,
                    Request,
                    Item,
                    Order,
                    Location,
                    Rating,
                ]),
                TypeOrmModule.forRoot({
                    type: "mariadb",
                    database: "unit_test",
                    host: "localhost",
                    port: 3306,
                    username: "root",
                    password: "root",
                    autoLoadEntities: true,
                    synchronize: true,
                    logging: false,
                }),
            ],
            providers: [UsersService],
        }).compile();

        service = moduleRef.get<UsersService>(UsersService);
    });

    afterAll(async () => {
        await moduleRef.close();
    });

    it("findAllUsers", async () => {
        const addresses = await service.findAll();
        expect(addresses).toHaveLength(0);
    });
});
