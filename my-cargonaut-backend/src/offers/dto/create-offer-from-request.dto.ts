import { Vehicle } from "../../vehicles/entities/vehicle.entity";
import { User } from "../../users/entities/user.entity";

export class CreateOfferFromRequestDto {
    vehicle: Vehicle;
    creator: User;
}
