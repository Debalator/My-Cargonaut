import { Test, TestingModule } from "@nestjs/testing";
import { OffersService } from "./offers.service";

describe("OffersService", () => {
    let service: OffersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [OffersService],
        }).compile();

        service = module.get<OffersService>(OffersService);
    });

    it.todo("implement tests ");
});
