import { User } from "../../users/entities/user.entity";
import { Address } from "../../addresses/entities/address.entity";
import { Item } from "../entities/item.entity";

export class CreateRequestDto {
    startAddress: Address;
    destAddress: Address;
    startDate: Date;
    destDate: Date;
    items: Item[];
    persons: number;
    price: number;
    active: boolean;
    creator: User;
}
