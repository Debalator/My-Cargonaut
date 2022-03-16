import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { TypeOrmSQLITETestingModule } from "../testing/TypeORMSQLITETestingModule";

describe("UsersService", () => {
    let service: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [...TypeOrmSQLITETestingModule()],
            providers: [UsersService],
        }).compile();

        service = module.get<UsersService>(UsersService);
    });

    it("findAllUsers", async () => {
        const users = await service.findAll();
        expect(users).toHaveLength(0);
    });
});
