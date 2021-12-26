import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Address } from "../../addresses/entities/address.entity";
import { Item } from "./item.entity";

@Entity()
export class Request {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("datetime")
    startDate: Date;

    @Column("datetime")
    destDate: Date;

    @Column("tinyint")
    persons: number;

    @Column("decimal", { precision: 6, scale: 2 })
    price: number;

    @Column("boolean", { default: true })
    active: boolean;

    @ManyToOne(() => User, (user) => user.requests, {
        onDelete: "RESTRICT",
    })
    public creator: User;

    @ManyToOne(() => Address, (address) => address.requestsStart, {
        onDelete: "RESTRICT",
    })
    public startAddress: Request;

    @ManyToOne(() => Address, (address) => address.requestsDest, {
        onDelete: "RESTRICT",
    })
    public destAddress: Request;

    @OneToMany(() => Item, (item) => item.request)
    items: Item[];
}
