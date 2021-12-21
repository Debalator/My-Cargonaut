import { User } from "../../users/entities/user.entity";
import { Address } from "../../addresses/entities/address.entity";

export class CreateRequestDto {
    startAddress: Address;
    destAddress: Address;
    startDate: Date;
    destDate: Date;
    price: number;
    active: boolean;
    creator: User;
}
