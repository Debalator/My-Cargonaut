import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "./entities/order.entity";

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>
    ) {}

    private defaultRelations = ["request", "offer"];

    private detailedRelations = [
        ...this.defaultRelations,
        "request.creator",
        "request.startAddress",
        "request.destAddress",
        "request.items",
        "offer.creator",
    ];

    create(createOrderDto: CreateOrderDto) {
        return this.orderRepository.save(createOrderDto);
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

    async update(id: number, updateOrderDto: UpdateOrderDto) {
        const existing = await this.orderRepository.findOne(id);
        if (!existing) throw new NotFoundException();

        const merged = this.orderRepository.merge(existing, updateOrderDto);
        return this.orderRepository.save(merged);
    }

    async remove(id: number) {
        await this.orderRepository.delete(id);
    }
}
