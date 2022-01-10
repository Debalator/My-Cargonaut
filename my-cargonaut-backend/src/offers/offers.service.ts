import {
    BadRequestException,
    forwardRef,
    Inject,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindCondition, Repository } from "typeorm";

import { CreateOfferDto } from "./dto/create-offer.dto";
import { UpdateOfferDto } from "./dto/update-offer.dto";
import { Offer } from "./entities/offer.entity";
import { CreateOfferFromRequestDto } from "./dto/create-offer-from-request.dto";
import { RequestsService } from "../requests/requests.service";
import { VehiclesService } from "../vehicles/vehicles.service";
import { AddressesService } from "../addresses/addresses.service";
import { Request } from "../requests/entities/request.entity";

@Injectable()
export class OffersService {
    constructor(
        @InjectRepository(Offer) private offerRepository: Repository<Offer>,

        @Inject(forwardRef(() => RequestsService))
        private requestService: RequestsService,

        private readonly vehicleService: VehiclesService,
        private readonly addressService: AddressesService
    ) {}

    private defaultRelations = [
        "creator",
        "vehicle",
        "startAddress",
        "destAddress",
    ];

    create(createOfferDto: CreateOfferDto) {
        return this.offerRepository.save(createOfferDto);
    }

    findAll(where: FindCondition<Offer>) {
        return this.offerRepository.find({
            relations: this.defaultRelations,
            where,
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
        request: Request
    ) {
        const vehicle = await this.vehicleService.findOne(
            createOfferFromRequestDto.vehicle.id
        );
        if (!vehicle) throw new NotFoundException("Vehicle not found");

        if (vehicle.seats < request.persons)
            throw new BadRequestException(
                `Vehicle must have at least ${request.persons} seats`
            );

        const totalItemSize = request.items.reduce(
            (prev, item) => prev + item.size,
            0
        );

        if (vehicle.loadingArea < totalItemSize) {
            throw new BadRequestException(
                `Vehicle must have at least ${totalItemSize} m^2 loading area`
            );
        }

        const offer = Offer.fromRequest(request);
        offer.creator = createOfferFromRequestDto.creator;
        offer.vehicle = createOfferFromRequestDto.vehicle;

        await this.addressService.create(offer.startAddress);
        await this.addressService.create(offer.destAddress);

        return this.create(offer);
    }
}
