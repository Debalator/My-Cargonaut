import { User } from "src/users/entities/user.entity";
import { Vehicle } from "../../vehicles/entities/vehicle.entity";
import { Address } from "../../addresses/entities/address.entity";

export class CreateOfferDto {
    startAddress: Address;
    destAddress: Address;
    startDate: Date;
    destDate: Date;
    price: number;
    vehicle: Vehicle;
    active: boolean;
    creator: User;
}
