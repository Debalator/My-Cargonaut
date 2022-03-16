import { Test, TestingModule } from "@nestjs/testing";
import { AddressesService } from "./addresses.service";
import { TypeOrmSQLITETestingModule } from "../testing/TypeORMSQLITETestingModule";

describe("AddressesService", () => {
    let service: AddressesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [...TypeOrmSQLITETestingModule()],
            providers: [AddressesService],
        }).compile();

        service = module.get<AddressesService>(AddressesService);
    });

    it("createAddress", async () => {
        const address = await service.create({
            city: "Gießen",
            zip: 35390,
            country: "Deutschland",
        });
        expect(address.id).toBe(1);
        expect(address.city).toBe("Gießen");
        expect(address.zip).toBe(35390);
        expect(address.country).toBe("Deutschland");
    });

    it("findAllAddresses", async () => {
        const addresses = await service.findAll();
        expect(addresses).toHaveLength(1);
    });

    it("updateAddress", async () => {
        const address = await service.update(1, {
            city: "Frankfurt a.M.",
            zip: 12312,
            country: "Deutschland",
        });
        expect(address.city).toBe("Frankfurt a.M.");
        expect(address.zip).toBe(12312);
        expect(address.country).toBe("Deutschland");
    });

    it("removeAddresses", async () => {
        await service.remove(1);
        const addresses = await service.findAll();
        expect(addresses).toHaveLength(0);
    });
});
