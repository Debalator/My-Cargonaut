import { Test, TestingModule } from "@nestjs/testing";
import { VehiclesService } from "./vehicles.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { readFileSync } from "fs";
import { Vehicle } from "./entities/vehicle.entity";
import { User } from "../users/entities/user.entity";
import { Offer } from "../offers/entities/offer.entity";
import { Address } from "../addresses/entities/address.entity";
import { Request } from "../requests/entities/request.entity";
import { Item } from "../requests/entities/item.entity";
import { Order } from "../orders/entities/order.entity";
import { Location } from "../orders/entities/location.entity";
import { Rating } from "../orders/entities/rating.entity";

describe("VehiclesService", () => {
    let moduleRef: TestingModule;
    let service: VehiclesService;

    beforeAll(async () => {
        moduleRef = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forFeature([
                    Vehicle,
                    User,
                    Offer,
                    Address,
                    Request,
                    Item,
                    Order,
                    Location,
                    Rating,
                ]),
                TypeOrmModule.forRoot(
                    JSON.parse(
                        readFileSync("ormconfig_test.json", {
                            encoding: "utf-8",
                        })
                    )
                ),
            ],
            providers: [VehiclesService],
        }).compile();

        service = moduleRef.get<VehiclesService>(VehiclesService);
    });

    afterAll(async () => {
        await moduleRef.close();
    });

    it("createVehicle", async () => {
        const vehicle = await service.create({
            brand: "VW",
            model: "Golf",
            loadingArea: 3,
            seats: 3,
            owner: null,
        });
        expect(vehicle.brand).toBe("VW");
    });

    it("findAllVehicles", async () => {
        const vehicles = await service.findAll();
        expect(vehicles).toHaveLength(1);
    });

    it("updateVehicle", async () => {
        const address = await service.update(1, {
            brand: "Audi",
            model: "Q7",
        });
        expect(address.brand).toBe("Audi");
        expect(address.model).toBe("Q7");
    });

    it("removeVehicle", async () => {
        await service.remove(1);
        const vehicles = await service.findAll();
        expect(vehicles).toHaveLength(0);
    });
});
