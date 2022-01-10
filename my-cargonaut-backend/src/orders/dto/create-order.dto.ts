import { Request } from "../../requests/entities/request.entity";
import { Offer } from "../../offers/entities/offer.entity";
import { User } from "../../users/entities/user.entity";

export class CreateOrderDto {
    request: Request;
    offer: Offer;
    creator: User;
}
