import {
    BadRequestException,
    forwardRef,
    Inject,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { CreateRequestDto } from "./dto/create-request.dto";
import { UpdateRequestDto } from "./dto/update-request.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { FindCondition, Repository } from "typeorm";
import { Request } from "./entities/request.entity";
import { Item } from "./entities/item.entity";
import { CreateRequestFromOfferDto } from "./dto/create-request-from-offer.dto";
import { OffersService } from "../offers/offers.service";
import { AddressesService } from "../addresses/addresses.service";
import { Offer } from "../offers/entities/offer.entity";

@Injectable()
export class RequestsService {
    constructor(
        @InjectRepository(Request)
        private requestRepository: Repository<Request>,

        @InjectRepository(Item)
        private itemRepository: Repository<Item>,

        @Inject(forwardRef(() => OffersService))
        private offersService: OffersService,

        private readonly addressService: AddressesService
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
        offer: Offer
    ) {
        if (offer.vehicle.seats < createRequestFromOfferDto.persons)
            throw new BadRequestException(
                `Maximum number of persons (${offer.vehicle.seats}) exceeded`
            );

        if (
            offer.vehicle.loadingArea <
            createRequestFromOfferDto.items.reduce(
                (prev, item) => prev + item.size,
                0
            )
        )
            throw new BadRequestException(
                `Maximum loading area (${offer.vehicle.loadingArea}) exceeded`
            );

        const request = Request.fromOffer(offer);
        request.creator = createRequestFromOfferDto.creator;
        request.items = createRequestFromOfferDto.items;
        request.persons = createRequestFromOfferDto.persons;

        await this.addressService.create(request.startAddress);
        await this.addressService.create(request.destAddress);

        return this.create(request);
    }

    findAll(where: FindCondition<Request> = {}) {
        return this.requestRepository.find({
            relations: this.defaultRelations,
            where,
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
