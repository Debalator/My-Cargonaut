import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Address } from "../../addresses/entities/address.entity";

@Entity()
export class Request {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("datetime")
    startDate: Date;

    @Column("datetime")
    destDate: Date;

    @Column("decimal", { precision: 6, scale: 2 })
    price: number;

    @Column("boolean", { default: true })
    active: boolean;

    @ManyToOne(() => User, (user) => user.offers)
    public creator: User;

    @ManyToOne(() => Address, (address) => address.requests)
    public startAddress: Request;

    @ManyToOne(() => Address, (address) => address.requests)
    public destAddress: Request;
}
