import { Test, TestingModule } from "@nestjs/testing";
import { VehiclesService } from "./vehicles.service";

describe("VehiclesService", () => {
    let service: VehiclesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [VehiclesService],
        }).compile();

        service = module.get<VehiclesService>(VehiclesService);
    });

    it.todo('implement tests');
});
