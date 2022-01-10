import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
    ManyToOne,
} from "typeorm";
import { Request } from "../../requests/entities/request.entity";
import { Offer } from "../../offers/entities/offer.entity";
import { Location } from "./location.entity";
import { Rating } from "./rating.entity";
import { User } from "../../users/entities/user.entity";

export enum OrderStatus {
    RECEIVED = "received",
    SHIPPED = "shipped",
    FINISHED = "finished",
    CANCELED = "canceled",
}

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created: Date;

    @Column({
        type: "enum",
        enum: OrderStatus,
        default: OrderStatus.RECEIVED,
    })
    status: OrderStatus;

    @ManyToOne(() => User, (user) => user.orders, {
        onDelete: "RESTRICT",
    })
    public creator: User;

    @OneToOne(() => Request, {
        onDelete: "RESTRICT",
    })
    @JoinColumn()
    request: Request;

    @OneToOne(() => Offer, {
        onDelete: "RESTRICT",
    })
    @JoinColumn()
    offer: Offer;

    @OneToOne(() => Location, {
        onDelete: "CASCADE",
    })
    @JoinColumn()
    location: Location;

    @OneToOne(() => Rating, {
        onDelete: "SET NULL",
    })
    @JoinColumn()
    rating: Rating;
}
