import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateRequestDto } from "./dto/create-request.dto";
import { UpdateRequestDto } from "./dto/update-request.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Request } from "./entities/request.entity";
import { Item } from "./entities/item.entity";
import { Offer } from "../offers/entities/offer.entity";
import { CreateRequestFromOfferDto } from "./dto/create-request-from-offer.dto";
import { OffersService } from "../offers/offers.service";

@Injectable()
export class RequestsService {
    constructor(
        @InjectRepository(Request)
        private requestRepository: Repository<Request>,
        @InjectRepository(Item)
        private itemRepository: Repository<Item>,
        private readonly offersService: OffersService
    ) {}

    private defaultRelations = [
        "creator",
        "startAddress",
        "destAddress",
        "items",
    ];

    async create(createRequestDto: CreateRequestDto) {
        await this.itemRepository.save(createRequestDto.items);
        return this.requestRepository.save(createRequestDto);
    }

    async createFromOffer(
        createRequestFromOfferDto: CreateRequestFromOfferDto,
        offerID: number
    ) {
        const offer = await this.offersService.findOne(offerID);
        if (!offer) throw new NotFoundException();

        const request = Request.fromOffer(offer);
        request.creator = createRequestFromOfferDto.creator;
        request.items = createRequestFromOfferDto.items;

        await this.itemRepository.save(createRequestFromOfferDto.items);
        return this.requestRepository.save(request);
    }

    findAll() {
        return this.requestRepository.find({
            relations: this.defaultRelations,
        });
    }

    findAllByCreator(creatorID: number) {
        return this.requestRepository.find({
            relations: this.defaultRelations,
            where: {
                creator: creatorID,
            },
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
