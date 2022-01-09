import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "./entities/order.entity";
import { UpdateLocationDto } from "./dto/update-location.dto";
import { Location } from "./entities/location.entity";

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(Location)
        private locationRepository: Repository<Location>
    ) {}

    private defaultRelations = ["request", "offer"];

    private detailedRelations = [
        ...this.defaultRelations,
        "location",
        "request.creator",
        "request.startAddress",
        "request.destAddress",
        "request.items",
        "offer.creator",
    ];

    async create(createOrderDto: CreateOrderDto) {
        createOrderDto.location = await this.createLocation();
        return this.orderRepository.save(createOrderDto);
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
}
