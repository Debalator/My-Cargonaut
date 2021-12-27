import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    JoinColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Address } from "../../addresses/entities/address.entity";
import { Item } from "./item.entity";
import { Offer } from "../../offers/entities/offer.entity";

@Entity()
export class Request {
    public static fromOffer(offer: Offer) {
        const request = new Request();
        request.startDate = offer.startDate;
        request.destDate = offer.destDate;
        request.price = offer.price;
        return request;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column("datetime")
    startDate: Date;

    @Column("datetime")
    destDate: Date;

    @Column("tinyint", { default: 0 })
    persons: number;

    @Column("decimal", { precision: 6, scale: 2 })
    price: number;

    @Column("boolean", { default: true })
    active: boolean;

    @ManyToOne(() => User, (user) => user.requests, {
        onDelete: "RESTRICT",
    })
    public creator: User;

    @OneToOne(() => Address, {
        onDelete: "RESTRICT",
    })
    @JoinColumn()
    public startAddress: Address;

    @OneToOne(() => Address, {
        onDelete: "RESTRICT",
    })
    @JoinColumn()
    public destAddress: Address;

    @OneToMany(() => Item, (item) => item.request)
    items: Item[];
}
