import { Request } from "../../requests/entities/request.entity";
import { Offer } from "../../offers/entities/offer.entity";
import { Location } from "../entities/location.entity";

export class CreateOrderDto {
    request: Request;
    offer: Offer;
    location: Location;
}
