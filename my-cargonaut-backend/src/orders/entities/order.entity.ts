import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
} from "typeorm";
import { Request } from "../../requests/entities/request.entity";
import { Offer } from "../../offers/entities/offer.entity";

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

    @Column("datetime", { default: () => "CURRENT_TIMESTAMP" })
    purchaseDate: Date;

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
}
