import { User } from "src/users/entities/user.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
export class Offer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 255 })
    startPoint: string;

    @Column("varchar", { length: 255 })
    destPoint: string;

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
