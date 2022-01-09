import { Test, TestingModule } from "@nestjs/testing";
import { AddressesService } from "./addresses.service";

describe("AddressesService", () => {
    let service: AddressesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AddressesService],
        }).compile();

        service = module.get<AddressesService>(AddressesService);
    });

    it.todo('implement tests');
});
