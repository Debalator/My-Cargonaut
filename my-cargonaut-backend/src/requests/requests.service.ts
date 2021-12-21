import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateRequestDto } from "./dto/create-request.dto";
import { UpdateRequestDto } from "./dto/update-request.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Request } from "./entities/request.entity";

@Injectable()
export class RequestsService {
    constructor(
        @InjectRepository(Request)
        private requestRepository: Repository<Request>
    ) {}

    private defaultRelations = ["creator", "startAddress", "destAddress"];

    create(createRequestDto: CreateRequestDto) {
        return this.requestRepository.save(createRequestDto);
    }

    findAll() {
        return this.requestRepository.find({
            relations: this.defaultRelations,
        });
    }

    findOne(id: number) {
        return this.requestRepository.findOne(id, {
            relations: this.defaultRelations,
        });
    }

    async update(id: number, updateRequestDto: UpdateRequestDto) {
        const existing = await this.requestRepository.findOne(id);
        if (!existing) throw new NotFoundException();

        const merged = this.requestRepository.merge(existing, updateRequestDto);
        return this.requestRepository.save(merged);
    }

    async remove(id: number) {
        await this.requestRepository.delete(id);
    }
}
