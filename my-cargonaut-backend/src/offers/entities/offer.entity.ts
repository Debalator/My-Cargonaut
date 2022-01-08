import { User } from "src/users/entities/user.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Address } from "../../addresses/entities/address.entity";

@Entity()
export class Offer {
    @PrimaryGeneratedColumn()
    id: number;


    @Column("varchar", {length: 255})
    startAddress: Address;

    @Column("varchar", {length: 255})
    destAddress: Address;

    @Column("datetime")
    startDate: Date;

    @Column("datetime")
    destDate: Date;

    @Column("decimal", { precision: 6, scale: 2 })
    price: number;

    @Column("decimal", { precision: 6, scale: 2 })
    seats: number;

    @Column("decimal", { precision: 6, scale: 2 })
    space: number;

    /*
    @Column("boolean")
    active = true;
    */
    @ManyToOne(() => User, (user) => user.offers)
    public creator: User;
}
