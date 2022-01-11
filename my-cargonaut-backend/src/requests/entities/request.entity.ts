import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
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
        request.startAddress = offer.startAddress;
        request.destAddress = offer.destAddress;
        request.price = offer.price;
        return request;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column("date")
    startDate: Date;

    @Column("date")
    destDate: Date;

    @Column("tinyint", { default: 0 })
    persons: number;

    @Column("decimal", { precision: 6, scale: 2 })
    price: number;

    @Column("boolean", { default: true })
    active: boolean;

    @CreateDateColumn()
    created: Date;

    @ManyToOne(() => User, (user) => user.requests, {
        onDelete: "CASCADE",
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
