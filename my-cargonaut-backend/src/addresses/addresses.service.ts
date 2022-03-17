import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateAddressDto } from "./dto/create-address.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Address } from "./entities/address.entity";

@Injectable()
export class AddressesService {
    constructor(
        @InjectRepository(Address)
        private addressRepository: Repository<Address>
    ) {}

    create(createAddressDto: CreateAddressDto) {
        return this.addressRepository.save(createAddressDto);
    }

    createDummy() {
        return this.create({
            city: "Lazy Town",
            zip: 12312,
            country: "Germany",
        });
    }

    findAll() {
        return this.addressRepository.find();
    }

    findOne(id: number) {
        return this.addressRepository.findOne(id);
    }

    async update(id: number, updateAddressDto: UpdateAddressDto) {
        const existing = await this.addressRepository.findOne(id);
        if (!existing) throw new NotFoundException();

        const merged = this.addressRepository.merge(existing, updateAddressDto);
        return this.addressRepository.save(merged);
    }

    async remove(id: number) {
        await this.addressRepository.delete(id);
    }
}
