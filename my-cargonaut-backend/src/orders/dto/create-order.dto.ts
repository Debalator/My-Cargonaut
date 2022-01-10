import { Request } from "../../requests/entities/request.entity";
import { Offer } from "../../offers/entities/offer.entity";

export class CreateOrderDto {
    request: Request;
    offer: Offer;
}
