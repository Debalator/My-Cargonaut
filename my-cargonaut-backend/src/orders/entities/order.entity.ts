import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
} from "typeorm";
import { Request } from "../../requests/entities/request.entity";
import { Offer } from "../../offers/entities/offer.entity";
import { Location } from "./location.entity";

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
        onDelete: "SET NULL",
    })
    @JoinColumn()
    location: Location;
}
