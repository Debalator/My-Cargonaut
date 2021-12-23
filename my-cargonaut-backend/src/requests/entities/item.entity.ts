import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Request } from "./request.entity";

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    description: string;

    @Column("tinyint")
    size: number;

    @Column("smallint")
    weight: number;

    @ManyToOne(() => Request, (req) => req.items, {
        onDelete: "CASCADE",
    })
    public request: Request;
}
