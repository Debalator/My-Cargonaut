import { User } from "src/users/entities/user.entity";

export class CreateVehicleDto {
    brand: string;
    model: string;
    seats: number;
    loadingArea: number;
    owner: User;
}
