import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity()
export class Location {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("decimal", { precision: 8, scale: 6, default: 0 })
    latitude: number;

    @Column("decimal", { precision: 9, scale: 6, default: 0 })
    longitude: number;

    @UpdateDateColumn()
    updated: Date;
}
