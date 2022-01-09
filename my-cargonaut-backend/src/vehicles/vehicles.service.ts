import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateVehicleDto } from "./dto/create-vehicle.dto";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto";
import { Vehicle } from "./entities/vehicle.entity";

@Injectable()
export class VehiclesService {
    constructor(
        @InjectRepository(Vehicle)
        private vehicleRepository: Repository<Vehicle>
    ) {}

    create(createVehicleDto: CreateVehicleDto) {
        return this.vehicleRepository.save(createVehicleDto);
    }

    findAll() {
        return this.vehicleRepository.find();
    }

    findAllByOwner(ownerID: number) {
        return this.vehicleRepository.find({
            where: {
                owner: ownerID,
            },
        });
    }

    findOne(id: number) {
        return this.vehicleRepository.findOne(id);
    }

    async update(id: number, updateVehicleDto: UpdateVehicleDto) {
        const existing = await this.vehicleRepository.findOne(id);
        if (!existing) throw new NotFoundException();

        const merged = this.vehicleRepository.merge(existing, updateVehicleDto);
        return this.vehicleRepository.save(merged);
    }

    async remove(id: number) {
        await this.vehicleRepository.delete(id);
    }
}
