import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "./entities/order.entity";
import { UpdateLocationDto } from "./dto/update-location.dto";
import { Location } from "./entities/location.entity";
import { Rating } from "./entities/rating.entity";
import { CreateRatingDto } from "./dto/create-rating.dto";
import { UpdateRatingDto } from "./dto/update-rating.dto";
import { OffersService } from "../offers/offers.service";
import { RequestsService } from "../requests/requests.service";

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        @InjectRepository(Location)
        private locationRepository: Repository<Location>,
        @InjectRepository(Rating) private ratingRepository: Repository<Rating>,

        private offerService: OffersService,
        private requestService: RequestsService
    ) {}

    private defaultRelations = ["request", "offer"];

    private detailedRelations = [
        ...this.defaultRelations,
        "location",
        "rating",
        "creator",
        "request.creator",
        "request.startAddress",
        "request.destAddress",
        "request.items",
        "offer.creator",
        "offer.startAddress",
        "offer.destAddress",
        "offer.vehicle",
    ];

    async create(createOrderDto: CreateOrderDto) {
        const offer = await this.offerService.findOne(createOrderDto.offer.id);
        if (!offer) throw new NotFoundException("Offer not found");

        const request = await this.requestService.findOne(
            createOrderDto.request.id
        );
        if (!request) throw new NotFoundException("Request not found");

        offer.active = false;
        await this.offerService.create(offer);

        request.active = false;
        await this.requestService.create(request);

        const order = new Order();
        order.request = request;
        order.offer = offer;
        order.creator = createOrderDto.creator;
        order.location = await this.createLocation();

        return this.orderRepository.save(order);
    }

    async createRating(orderID: number, createRatingDto: CreateRatingDto) {
        const order = await this.orderRepository.findOne(orderID);
        if (!order) throw new NotFoundException("Order not found");

        order.rating = await this.ratingRepository.save(createRatingDto);
        await this.orderRepository.save(order);

        return order.rating;
    }

    async updateRating(
        orderID: number,
        ratingID: number,
        updateRatingDto: UpdateRatingDto
    ) {
        const order = await this.orderRepository.findOne(orderID);
        if (!order) throw new NotFoundException("Order not found");

        const rating = await this.ratingRepository.findOne(ratingID);
        if (!rating) throw new NotFoundException("Rating not found");

        const merged = this.ratingRepository.merge(rating, updateRatingDto);
        return this.ratingRepository.save(merged);
    }

    createLocation() {
        const location = new Location();
        return this.locationRepository.save(location);
    }

    findAll() {
        return this.orderRepository.find({
            relations: this.defaultRelations,
        });
    }

    findOne(id: number) {
        return this.orderRepository.findOne(id, {
            relations: this.detailedRelations,
        });
    }

    async findLocation(orderID: number) {
        const order = await this.orderRepository.findOne(orderID, {
            relations: ["location"],
        });
        if (!order) throw new NotFoundException("Order not found");

        return order.location;
    }

    async update(id: number, updateOrderDto: UpdateOrderDto) {
        const existing = await this.orderRepository.findOne(id);
        if (!existing) throw new NotFoundException();

        const merged = this.orderRepository.merge(existing, updateOrderDto);
        return this.orderRepository.save(merged);
    }

    async updateLocation(
        orderID: number,
        updateLocationDto: UpdateLocationDto
    ) {
        const location = await this.findLocation(orderID);
        location.longitude = updateLocationDto.longitude;
        location.latitude = updateLocationDto.latitude;

        return this.locationRepository.save(location);
    }

    async remove(id: number) {
        await this.orderRepository.delete(id);
    }

    async findOrdersByUser(id: number) {
        const orderOffers = await this.orderRepository.find({
            where: {
                offer: {
                    creator: id,
                },
            },
            relations: [
                "offer",
                "offer.creator",
                "offer.startAddress",
                "offer.destAddress",
                "offer.vehicle",
            ],
        });

        const orderRequests = await this.orderRepository.find({
            where: {
                request: {
                    creator: id,
                },
            },
            relations: [
                "request",
                "request.creator",
                "request.startAddress",
                "request.destAddress",
                "request.items",
            ],
        });

        return {
            offers: orderOffers,
            requests: orderRequests,
        };
    }

    async findRatingsByUser(id: number) {
        const orders = await this.orderRepository.find({
            where: {
                offer: {
                    creator: id,
                },
            },
            relations: ["offer", "offer.creator", "rating"],
        });

        return orders.map((order) => ({
            ...order.rating,
            author: order.offer.creator,
        }));
    }
}
