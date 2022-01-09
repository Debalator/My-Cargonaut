import { User } from "src/users/entities/user.entity";
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Offer } from "../../offers/entities/offer.entity";

@Entity()
export class Vehicle {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    brand: string;

    @Column("varchar")
    model: string;

    @Column("tinyint")
    seats: number;

    @Column("smallint")
    loadingArea: number;

    @ManyToOne(() => User, (user) => user.vehicles)
    public owner: User;

    @OneToMany(() => Offer, (offer) => offer.vehicle)
    public offers: Offer[];
}
