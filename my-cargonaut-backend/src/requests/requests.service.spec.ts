import { Test, TestingModule } from "@nestjs/testing";
import { RequestsService } from "./requests.service";
import { Repository } from "typeorm";
import { Offer } from "../offers/entities/offer.entity";
import { OffersService } from "../offers/offers.service";
import { AddressesService } from "../addresses/addresses.service";
import { UsersService } from "../users/users.service";
import { VehiclesService } from "../vehicles/vehicles.service";
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import { createTestConfiguration } from "../utils/createDB";
import { Vehicle } from "../vehicles/entities/vehicle.entity";
import { User } from "../users/entities/user.entity";
import { Address } from "../addresses/entities/address.entity";
import { Request } from "./entities/request.entity";
import { Item } from "./entities/item.entity";
import { Order } from "../orders/entities/order.entity";
import { Location } from "../orders/entities/location.entity";
import { Rating } from "../orders/entities/rating.entity";
import { BadRequestException } from "@nestjs/common";

describe("RequestsService", () => {
    let repo: Repository<Request>;
    let service: RequestsService;
    let addService: AddressesService;
    let userService: UsersService;
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

        service = module.get<RequestsService>(RequestsService);
        addService = module.get<AddressesService>(AddressesService);
        userService = module.get<UsersService>(UsersService);

        repo = module.get<Repository<Request>>(getRepositoryToken(Request));
    });

    afterAll(() => {
        module.close();
    });

    it("createRequest", async () => {
        const address = await addService.createDummy();
        const creator = await userService.createDummy();

        const items: Partial<Item>[] = [
            {
                description: "My cool item",
                size: 1,
                weight: 5,
            },
        ];

        const now = new Date();

        const request = await service.create({
            startDate: now,
            destDate: now,
            price: 400,
            startAddress: address,
            destAddress: address,
            creator,
            persons: 2,
            items: items as Item[],
        });

        expect(request.id).toBe(1);
        expect(request.price).toBe(400);
        expect(request.persons).toBe(2);
        expect(request.startDate).toBe(now);
        expect(request.destDate).toBe(now);

        expect(request.startAddress).toBe(address);
        expect(request.destAddress).toBe(address);
        expect(request.creator).toBe(creator);
        expect(request.items).toBe(items);
    });

    it("findAllRequests", async () => {
        const requests = await service.findAll({});
        expect(requests).toHaveLength(1);
    });

    it("findAllByCreator", async () => {
        const requests = await service.findAllByCreator(1);
        expect(requests).toHaveLength(1);
    });

    it("updateOffer", async () => {
        const request = await service.update(1, {
            price: 3000,
            persons: 5,
        });
        expect(request.price).toBe(3000);
        expect(request.persons).toBe(5);
    });

    it("removeRequest", async () => {
        await service.remove(1);
        const requests = await service.findAll({});
        expect(requests).toHaveLength(0);
    });

    it("createFromOffer", async () => {
        const creator = await userService.findOne(1);
        const address = await addService.findOne(1);
        const offer: Offer = {
            id: 1,
            price: 100,
            creator,
            active: true,
            startAddress: address,
            destAddress: address,
            startDate: new Date(),
            destDate: new Date(),
            vehicle: {
                id: 1,
                brand: "VW",
                model: "Golf",
                offers: [],
                owner: creator,
                loadingArea: 5,
                seats: 4,
            },
            created: new Date(),
        };

        // Too many persons
        await expect(
            service.createFromOffer(
                {
                    creator,
                    items: [],
                    persons: 5,
                },
                offer
            )
        ).rejects.toThrow(BadRequestException);

        // Too large items
        await expect(
            service.createFromOffer(
                {
                    creator,
                    persons: 1,
                    items: [
                        {
                            id: 1,
                            size: 10,
                            description: "ABC",
                            weight: 100,
                            request: null,
                        },
                    ],
                },
                offer
            )
        ).rejects.toThrow(BadRequestException);

        const request = await service.createFromOffer(
            {
                creator,
                persons: 1,
                items: [
                    {
                        id: 1,
                        size: 3,
                        description: "ABC",
                        weight: 5,
                        request: null,
                    },
                ],
            },
            offer
        );

        expect(request.price).toBe(offer.price);
        expect(request.startAddress).toBe(offer.startAddress);
        expect(request.destAddress).toBe(offer.destAddress);
        expect(request.startDate).toBe(offer.startDate);
        expect(request.destDate).toBe(offer.destDate);
    });
});
