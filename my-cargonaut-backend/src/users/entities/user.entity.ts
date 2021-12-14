import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column("varchar", { length: 255})
    username: string;
    @Column("date")
    birthDate: Date;
    @Column("varchar", { length: 255})
    mail: string;
    @Column("varchar", { length: 255})
    password: string;
    @Column("varchar", { length: 255})
    profilePicturePath: string = "default.png";
}
