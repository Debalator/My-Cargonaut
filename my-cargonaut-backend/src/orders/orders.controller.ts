import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Put,
} from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { UpdateLocationDto } from "./dto/update-location.dto";
import { CreateRatingDto } from "./dto/create-rating.dto";
import { UpdateRatingDto } from "./dto/update-rating.dto";

@Controller("orders")
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.ordersService.create(createOrderDto);
    }

    @Get()
    findAll() {
        return this.ordersService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.ordersService.findOne(+id);
    }

    @Post(":id/rating")
    createRating(
        @Param("id") id: string,
        @Body() createRatingDto: CreateRatingDto
    ) {
        return this.ordersService.createRating(+id, createRatingDto);
    }

    @Patch(":orderID/rating/:ratingID")
    updateRating(
        @Param("orderID") orderID: string,
        @Param("ratingID") ratingID: string,
        @Body() updateRatingDto: UpdateRatingDto
    ) {
        return this.ordersService.updateRating(
            +orderID,
            +ratingID,
            updateRatingDto
        );
    }

    @Get(":id/location")
    findLocation(@Param("id") id: string) {
        return this.ordersService.findLocation(+id);
    }

    @Put(":id/location")
    updateLocation(
        @Param("id") id: string,
        @Body() updateLocationDto: UpdateLocationDto
    ) {
        return this.ordersService.updateLocation(+id, updateLocationDto);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateOrderDto: UpdateOrderDto) {
        return this.ordersService.update(+id, updateOrderDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.ordersService.remove(+id);
    }
}
