import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
    ManyToOne,
    OneToMany,
} from "typeorm";
import { Request } from "../../requests/entities/request.entity";
import { Offer } from "../../offers/entities/offer.entity";
import { Location } from "./location.entity";
import { User } from "../../users/entities/user.entity";
import { Rating } from "./rating.entity";

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

    @OneToMany(() => Rating, (rating) => rating.order)
    public ratings: Rating[];
}
