import { Test, TestingModule } from "@nestjs/testing";
import { AddressesController } from "./addresses.controller";
import { AddressesService } from "./addresses.service";

describe("AddressesController", () => {
    let controller: AddressesController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AddressesController],
            providers: [AddressesService],
        }).compile();

        controller = module.get<AddressesController>(AddressesController);
    });

    it.todo("implement tests");
});
