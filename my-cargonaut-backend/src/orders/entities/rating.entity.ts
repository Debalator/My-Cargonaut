import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
} from "typeorm";
import { Order } from "./order.entity";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Rating {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    title: string;

    @Column("text")
    description: string;

    @Column("tinyint")
    stars: number;

    @CreateDateColumn()
    created: Date;

    @ManyToOne(() => Order, (order) => order.ratings, {
        onDelete: "CASCADE",
    })
    public order: Order;
}
