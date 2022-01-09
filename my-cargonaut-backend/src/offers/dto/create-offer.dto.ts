import { User } from "src/users/entities/user.entity";
import { Address } from "../../addresses/entities/address.entity";

export class CreateOfferDto {
    startAddress: Address;
    destAddress: Address;
    startDate: Date;
    destDate: Date;
    price: number;
    // vehicleId: Vehicle;
    seats: number;
    space: number;
    //active: boolean;
    creator: User;
}
