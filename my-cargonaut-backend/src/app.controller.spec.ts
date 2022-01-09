import { JwtModule, JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { jwtConstants } from "./auth/constants";
import { UsersService } from "./users/users.service";

describe("AppController", () => {
    let appController: AppController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            imports: [
                JwtModule.register({
                    secret: jwtConstants.secret,
                    signOptions: { expiresIn: "30d" },
                }),
            ],
            providers: [AppService, UsersService, JwtService],
        }).compile();

        appController = app.get<AppController>(AppController);
    });

    describe("root", () => {
        it.todo("implement tests");
    });
});
