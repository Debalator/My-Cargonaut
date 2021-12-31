import { User } from "src/users/entities/user.entity";

export class CreateOfferDto {
    startPoint: string;
    destPoint: string;
    startDate: Date;
    destDate: Date;
    price: number;
    // vehicleId: Vehicle;
    seats: number;
    space: number;
    //active: boolean;
    creator: User;
}
