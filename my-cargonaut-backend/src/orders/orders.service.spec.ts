import { Test, TestingModule } from "@nestjs/testing";
import { OrdersService } from "./orders.service";
import { Repository } from "typeorm";
import { Request } from "../requests/entities/request.entity";
import { RequestsService } from "../requests/requests.service";
import { AddressesService } from "../addresses/addresses.service";
import { UsersService } from "../users/users.service";
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import { createTestConfiguration } from "../utils/createDB";
import { Vehicle } from "../vehicles/entities/vehicle.entity";
import { User } from "../users/entities/user.entity";
import { Offer } from "../offers/entities/offer.entity";
import { Address } from "../addresses/entities/address.entity";
import { Item } from "../requests/entities/item.entity";
import { Order, OrderStatus } from "./entities/order.entity";
import { Location } from "./entities/location.entity";
import { Rating } from "./entities/rating.entity";
import { OffersService } from "../offers/offers.service";
import { VehiclesService } from "../vehicles/vehicles.service";
import { BadRequestException, NotFoundException } from "@nestjs/common";

describe("OrdersService", () => {
    let repo: Repository<Order>;
    let service: OrdersService;
    let reqService: RequestsService;
    let offService: OffersService;
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
                OrdersService,
                OffersService,
                AddressesService,
                RequestsService,
                VehiclesService,
                UsersService,
            ],
        }).compile();

        service = module.get<OrdersService>(OrdersService);
        reqService = module.get<RequestsService>(RequestsService);
        offService = module.get<OffersService>(OffersService);
        addService = module.get<AddressesService>(AddressesService);
        userService = module.get<UsersService>(UsersService);
        vehiclesService = module.get<VehiclesService>(VehiclesService);

        repo = module.get<Repository<Order>>(getRepositoryToken(Order));
    });

    afterAll(() => {
        module.close();
    });

    it("createOrder", async () => {
        const address = await addService.createDummy();
        const creator = await userService.createDummy();
        const vehicle = await vehiclesService.createDummy(creator);

        const request = await reqService.create({
            creator,
            startDate: new Date(),
            destDate: new Date(),
            startAddress: address,
            destAddress: address,
            price: 200,
            items: [],
            persons: 2,
        });

        const offer = await offService.createFromRequest(
            {
                creator,
                vehicle,
            },
            request
        );

        const order = await service.create({
            request,
            offer,
            creator,
        });

        expect(order.id).toBe(1);
        expect(order.status).toBe(OrderStatus.RECEIVED);
        expect(order.offer.active).toBe(false);
        expect(order.request.active).toBe(false);
    });

    it("createRating", async () => {
        const order = await service.findOne(1);

        const rat = {
            description: "Very nice!",
            stars: 3,
            title: "Top!",
        };

        await expect(service.createRating(2, rat)).rejects.toThrow(
            NotFoundException
        );

        const rating = await service.createRating(1, rat);

        expect(rating.id).toBe(1);
        expect(rating.title).toBe(rat.title);
        expect(rating.description).toBe(rat.description);
        expect(rating.stars).toBe(rat.stars);
    });

    it("findAllOrders", async () => {
        const orders = await service.findAll();
        expect(orders).toHaveLength(1);
    });

    it("findOrdersByUser", async () => {
        const orders = await service.findOrdersByUser(1);
        expect(orders.requests).toHaveLength(1);
        expect(orders.offers).toHaveLength(1);
    });

    it("removeOrder", async () => {
        await service.remove(1);
        const orders = await service.findAll();
        expect(orders).toHaveLength(0);
    });
});
