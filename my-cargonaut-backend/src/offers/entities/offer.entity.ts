import { User } from "src/users/entities/user.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
export class Offer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("datetime")
    startDate;

    @Column("datetime")
    destDate;

    @Column("decimal", { precision: 6, scale: 2 })
    price;

    @Column("boolean")
    active;

    @ManyToOne(() => User, (user) => user.offers)
    public creator: User;
}
