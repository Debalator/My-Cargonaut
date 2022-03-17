import { AddressesService } from "./addresses.service";
import { Address } from "./entities/address.entity";
import { Repository } from "typeorm";
import { createTestConfiguration } from "../utils/createDB";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";

describe("AddressesService", () => {
    let repo: Repository<Address>;
    let service: AddressesService;
    let module: TestingModule;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot(await createTestConfiguration([Address])),
                TypeOrmModule.forFeature([Address]),
            ],
            providers: [AddressesService],
        }).compile();

        service = module.get<AddressesService>(AddressesService);
        repo = module.get<Repository<Address>>(getRepositoryToken(Address));
    });

    afterAll(() => {
        module.close();
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
