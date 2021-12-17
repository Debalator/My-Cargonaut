import { Offer } from "src/offers/entities/offer.entity";
import { Vehicle } from "src/vehicles/entities/vehicle.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 255 })
    username: string;

    @Column("date")
    birthDate: Date;

    @Column("varchar", { length: 255 })
    mail: string;

    @Column("varchar", { length: 255 })
    password: string;

    @Column("varchar", { length: 255 })
    profilePicturePath = "default.png";

    @OneToMany(() => Offer, (offer) => offer.creator)
    offers: Offer[];

    @OneToMany(() => Vehicle, (vehicle) => vehicle.owner)
    vehicles: Offer[];
}
