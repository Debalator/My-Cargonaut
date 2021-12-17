import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Vehicle {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    brand: string;

    @Column("varchar")
    model: string;

    @Column("smallint")
    seats: number;

    @Column("smallint")
    loadingArea: number;

    @ManyToOne(() => User, (user) => user.vehicles)
    public owner: User;
}
