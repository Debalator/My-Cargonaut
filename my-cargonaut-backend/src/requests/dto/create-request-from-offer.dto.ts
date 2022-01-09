import { Item } from "../entities/item.entity";
import { User } from "../../users/entities/user.entity";

export class CreateRequestFromOfferDto {
    items: Item[];
    creator: User;
}
