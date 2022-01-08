import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersService } from "./users/users.service";
import {ModuleMocker, MockFunctionMetadata} from 'jest-mock';

describe("AppController", () => {
    let appController: AppController;
    const moduleMocker = new ModuleMocker(global);

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService, UsersService, JwtService],
        }).useMocker(token => {
            const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
            const Mock = moduleMocker.generateFromMetadata(mockMetadata);
            return new Mock();
        })
        .compile();

        appController = app.get<AppController>(AppController);
    });

    describe("root", () => {
        it("should be defined", () => {
            expect(appController).toBeDefined();
        });
    });
});
