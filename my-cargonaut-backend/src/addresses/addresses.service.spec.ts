import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AddressesService } from "./addresses.service";
import { Address } from "./entities/address.entity";
import { readFileSync } from "fs";

describe("AddressesService", () => {
    let moduleRef: TestingModule;
    let service: AddressesService;

    beforeAll(async () => {
        moduleRef = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forFeature([Address]),
                TypeOrmModule.forRoot(
                    JSON.parse(
                        readFileSync("ormconfig_test.json", {
                            encoding: "utf-8",
                        })
                    )
                ),
            ],
            providers: [AddressesService],
        }).compile();

        service = moduleRef.get<AddressesService>(AddressesService);
    });

    afterAll(async () => {
        await moduleRef.close();
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
