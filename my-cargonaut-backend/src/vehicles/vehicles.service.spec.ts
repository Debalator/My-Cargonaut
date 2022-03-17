import { Test, TestingModule } from "@nestjs/testing";
import { VehiclesService } from "./vehicles.service";
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import { Vehicle } from "./entities/vehicle.entity";
import { User } from "../users/entities/user.entity";
import { Offer } from "../offers/entities/offer.entity";
import { Address } from "../addresses/entities/address.entity";
import { Request } from "../requests/entities/request.entity";
import { Item } from "../requests/entities/item.entity";
import { Order } from "../orders/entities/order.entity";
import { Location } from "../orders/entities/location.entity";
import { Rating } from "../orders/entities/rating.entity";
import { Repository } from "typeorm";
import { createTestConfiguration } from "../utils/createDB";

describe("VehiclesService", () => {
    let repo: Repository<Vehicle>;
    let service: VehiclesService;
    let module: TestingModule;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot(
                    await createTestConfiguration([
                        Vehicle,
                        User,
                        Offer,
                        Address,
                        Request,
                        Item,
                        Order,
                        Location,
                        Rating,
                    ])
                ),
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
            ],
            providers: [VehiclesService],
        }).compile();

        service = module.get<VehiclesService>(VehiclesService);
        repo = module.get<Repository<Vehicle>>(getRepositoryToken(Vehicle));
    });

    afterAll(() => {
        module.close();
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
