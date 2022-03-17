import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import { Address } from "../addresses/entities/address.entity";
import { User } from "./entities/user.entity";
import { Offer } from "../offers/entities/offer.entity";
import { Request } from "../requests/entities/request.entity";
import { Vehicle } from "../vehicles/entities/vehicle.entity";
import { Order } from "../orders/entities/order.entity";
import { Item } from "../requests/entities/item.entity";
import { Location } from "../orders/entities/location.entity";
import { Rating } from "../orders/entities/rating.entity";
import { Repository } from "typeorm";
import { createTestConfiguration } from "../utils/createDB";

describe("UsersService", () => {
    let repo: Repository<User>;
    let service: UsersService;
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
            providers: [UsersService],
        }).compile();

        service = module.get<UsersService>(UsersService);
        repo = module.get<Repository<User>>(getRepositoryToken(User));
    });

    afterAll(() => {
        module.close();
    });

    it("createUser", async () => {
        const now = new Date();

        const user = await service.create({
            mail: "max@mustermann.com",
            birthDate: now,
            password: "abc",
            username: "maxmustermann",
            profilePicturePath: "/assets/default.jpg",
        });
        expect(user.mail).toBe("max@mustermann.com");
        expect(user.birthDate).toBe(now);
        expect(user.username).toBe("maxmustermann");
        expect(user.profilePicturePath).toBe("/assets/default.jpg");
    });

    it("findAllUsers", async () => {
        const users = await service.findAll();
        expect(users).toHaveLength(1);
    });

    it("updateUser", async () => {
        const address = await service.update(1, {
            mail: "test@test.com",
            username: "testos",
        });
        expect(address.mail).toBe("test@test.com");
        expect(address.username).toBe("testos");
    });

    it("removeUser", async () => {
        await service.remove(1);
        const users = await service.findAll();
        expect(users).toHaveLength(0);
    });
});
