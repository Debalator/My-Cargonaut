import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Put,
    UseGuards,
    Request,
    NotFoundException,
} from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { UpdateLocationDto } from "./dto/update-location.dto";
import { CreateRatingDto } from "./dto/create-rating.dto";
import { UpdateRatingDto } from "./dto/update-rating.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateOfferFromRequestDto } from "../offers/dto/create-offer-from-request.dto";
import { OffersService } from "../offers/offers.service";
import { RequestsService } from "../requests/requests.service";
import { CreateRequestFromOfferDto } from "../requests/dto/create-request-from-offer.dto";

@Controller("orders")
export class OrdersController {
    constructor(
        private readonly ordersService: OrdersService,
        private readonly offersService: OffersService,
        private readonly requestsService: RequestsService
    ) {}

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

    @UseGuards(JwtAuthGuard)
    @Post("/requests/:id")
    async createFromRequest(
        @Request() req,
        @Param("id") id: string,
        @Body() createOfferFromRequestDto: CreateOfferFromRequestDto
    ) {
        const request = await this.requestsService.findOne(+id);
        if (!request) throw new NotFoundException("Request not found");

        const offer = await this.offersService.createFromRequest(
            {
                ...createOfferFromRequestDto,
                creator: req.user.id,
            },
            request
        );

        return this.ordersService.create({
            request,
            offer,
            creator: req.user.id,
        });
    }

    @UseGuards(JwtAuthGuard)
    @Post("/offers/:id")
    async createFromOffer(
        @Request() req,
        @Param("id") id: string,
        @Body() createRequestFromOfferDto: CreateRequestFromOfferDto
    ) {
        const offer = await this.offersService.findOne(+id);
        if (!offer) throw new NotFoundException("Offer not found");

        const request = await this.requestsService.createFromOffer(
            {
                ...createRequestFromOfferDto,
                creator: req.user.id,
            },
            offer
        );

        return this.ordersService.create({
            request,
            offer,
            creator: req.user.id,
        });
    }
}
