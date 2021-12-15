import { User } from "src/users/entities/user.entity";

export class CreateOfferDto {
    startDate: Date;
    destDate: Date;
    price: number;
    //active: boolean;
    creator: User;
}
