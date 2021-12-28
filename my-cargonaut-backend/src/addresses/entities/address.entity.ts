import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Request } from "../../requests/entities/request.entity";

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("mediumint")
    zip: number;

    @Column("varchar")
    country: string;

    @Column("varchar")
    city: string;
}
