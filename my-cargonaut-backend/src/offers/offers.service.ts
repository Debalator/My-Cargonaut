import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateOfferDto } from "./dto/create-offer.dto";
import { UpdateOfferDto } from "./dto/update-offer.dto";
import { Offer } from "./entities/offer.entity";

@Injectable()
export class OffersService {
    constructor(
        @InjectRepository(Offer) private offerRepository: Repository<Offer>
    ) {}

    private defaultRelations = ["creator", "vehicle"];

    create(createOfferDto: CreateOfferDto) {
        return this.offerRepository.save(createOfferDto);
    }

    findAll() {
        return this.offerRepository.find({
            relations: this.defaultRelations,
        });
    }

    findOne(id: number) {
        return this.offerRepository.findOne(id, {
            relations: this.defaultRelations,
        });
    }

    async update(id: number, updateOfferDto: UpdateOfferDto) {
        const existing = await this.offerRepository.findOne(id);
        if (!existing) throw new NotFoundException();

        const merged = this.offerRepository.merge(existing, updateOfferDto);
        return this.offerRepository.save(merged);
    }

    async remove(id: number) {
        await this.offerRepository.delete(id);
    }
}
