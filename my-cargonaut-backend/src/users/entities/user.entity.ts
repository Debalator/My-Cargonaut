import { Offer } from "src/offers/entities/offer.entity";
import { Request } from "src/requests/entities/request.entity";
import { Vehicle } from "src/vehicles/entities/vehicle.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "../../orders/entities/order.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 255 })
    username: string;

    @Column("date")
    birthDate: Date;

    @Column("varchar", { length: 255 })
    mail: string;

    @Column("varchar", { length: 255 })
    password: string;

    @Column("varchar", { length: 255 })
    profilePicturePath = "/assets/default.jpg";

    @OneToMany(() => Offer, (offer) => offer.creator)
    offers: Offer[];

    @OneToMany(() => Request, (req) => req.creator)
    requests: Request[];

    @OneToMany(() => Vehicle, (vehicle) => vehicle.owner)
    vehicles: Vehicle[];

    @OneToMany(() => Order, (order) => order.creator)
    orders: Order[];
}
