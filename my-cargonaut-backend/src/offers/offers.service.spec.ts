import { Test, TestingModule } from "@nestjs/testing";
import { OffersService } from "./offers.service";
import { Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { UsersService } from "../users/users.service";
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import { createTestConfiguration } from "../utils/createDB";
import { Vehicle } from "../vehicles/entities/vehicle.entity";
import { Offer } from "./entities/offer.entity";
import { Address } from "../addresses/entities/address.entity";
import { Request } from "../requests/entities/request.entity";
import { Item } from "../requests/entities/item.entity";
import { Order } from "../orders/entities/order.entity";
import { Location } from "../orders/entities/location.entity";
import { Rating } from "../orders/entities/rating.entity";
import { AddressesService } from "../addresses/addresses.service";
import { RequestsService } from "../requests/requests.service";
import { VehiclesService } from "../vehicles/vehicles.service";
import { BadRequestException } from "@nestjs/common";

describe("OffersService", () => {
    let repo: Repository<Offer>;
    let service: OffersService;
    let addService: AddressesService;
    let userService: UsersService;
    let vehiclesService: VehiclesService;
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
            providers: [
                OffersService,
                AddressesService,
                RequestsService,
                VehiclesService,
                UsersService,
            ],
        }).compile();

        service = module.get<OffersService>(OffersService);
        addService = module.get<AddressesService>(AddressesService);
        userService = module.get<UsersService>(UsersService);
        vehiclesService = module.get<VehiclesService>(VehiclesService);

        repo = module.get<Repository<Offer>>(getRepositoryToken(Offer));
    });

    afterAll(() => {
        module.close();
    });

    it("createOffer", async () => {
        const address = await addService.createDummy();
        const creator = await userService.createDummy();
        const vehicle = await vehiclesService.createDummy(creator);

        const now = new Date();

        const offer = await service.create({
            startDate: now,
            destDate: now,
            price: 400,
            startAddress: address,
            destAddress: address,
            creator,
            vehicle,
            active: true,
        });

        expect(offer.id).toBe(1);
        expect(offer.price).toBe(400);
        expect(offer.startDate).toBe(now);
        expect(offer.destDate).toBe(now);

        expect(offer.startAddress).toBe(address);
        expect(offer.destAddress).toBe(address);
        expect(offer.creator).toBe(creator);
        expect(offer.vehicle).toBe(vehicle);
    });

    it("findAllOffers", async () => {
        const offers = await service.findAll({});
        expect(offers).toHaveLength(1);
    });

    it("updateOffer", async () => {
        const offer = await service.update(1, {
            price: 3000,
            active: false,
        });
        expect(offer.price).toBe(3000);
        expect(offer.active).toBe(false);
    });

    it("removeOffer", async () => {
        await service.remove(1);
        const offers = await service.findAll({});
        expect(offers).toHaveLength(0);
    });

    it("createFromRequest", async () => {
        const creator = await userService.findOne(1);
        const address = await addService.findOne(1);
        const vehicle = await vehiclesService.findOne(1);

        const request: Request = {
            id: 1,
            persons: 2,
            items: [
                {
                    id: 1,
                    size: 3,
                    description: "ABC",
                    weight: 100,
                    request: null,
                },
            ],
            price: 300,
            active: true,
            startDate: new Date(),
            destDate: new Date(),
            startAddress: address,
            destAddress: address,
            creator,
            created: new Date(),
        };

        // Too few seats
        await expect(
            service.createFromRequest(
                {
                    creator,
                    vehicle: await vehiclesService.create({
                        brand: "VW",
                        model: "Golf",
                        owner: creator,
                        loadingArea: 5,
                        seats: 1,
                    }),
                },
                request
            )
        ).rejects.toThrow(BadRequestException);

        // Too small loading area
        await expect(
            service.createFromRequest(
                {
                    creator,
                    vehicle: await vehiclesService.create({
                        brand: "VW",
                        model: "Golf",
                        owner: creator,
                        loadingArea: 1,
                        seats: 5,
                    }),
                },
                request
            )
        ).rejects.toThrow(BadRequestException);

        const offer = await service.createFromRequest(
            {
                creator,
                vehicle,
            },
            request
        );

        expect(offer.price).toBe(request.price);
        expect(offer.startAddress).toBe(request.startAddress);
        expect(offer.destAddress).toBe(request.destAddress);
        expect(offer.startDate).toBe(request.startDate);
        expect(offer.destDate).toBe(request.destDate);
    });
});
