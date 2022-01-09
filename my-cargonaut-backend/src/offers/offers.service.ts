import {
    forwardRef,
    Inject,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateOfferDto } from "./dto/create-offer.dto";
import { UpdateOfferDto } from "./dto/update-offer.dto";
import { Offer } from "./entities/offer.entity";
import { CreateOfferFromRequestDto } from "./dto/create-offer-from-request.dto";
import { RequestsService } from "../requests/requests.service";

@Injectable()
export class OffersService {
    constructor(
        @InjectRepository(Offer) private offerRepository: Repository<Offer>,

        @Inject(forwardRef(() => RequestsService))
        private requestService: RequestsService
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

    async createFromRequest(
        createOfferFromRequestDto: CreateOfferFromRequestDto,
        requestID: number
    ) {
        const request = await this.requestService.findOne(requestID);
        if (!request) throw new NotFoundException("Request not found");

        const offer = Offer.fromRequest(request);
        offer.creator = createOfferFromRequestDto.creator;
        offer.vehicle = createOfferFromRequestDto.vehicle;

        return this.create(offer);
    }
}
