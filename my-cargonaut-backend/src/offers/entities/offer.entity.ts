import { User } from "src/users/entities/user.entity";
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
} from "typeorm";
import { Address } from "../../addresses/entities/address.entity";
import { Vehicle } from "../../vehicles/entities/vehicle.entity";
import { Request } from "../../requests/entities/request.entity";

@Entity()
export class Offer {
    public static fromRequest(request: Request) {
        const offer = new Offer();
        offer.startDate = request.startDate;
        offer.destDate = request.destDate;
        offer.startAddress = request.startAddress;
        offer.destAddress = request.destAddress;
        offer.price = request.price;
        return offer;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column("datetime")
    startDate: Date;

    @Column("datetime")
    destDate: Date;

    @Column("decimal", { precision: 6, scale: 2 })
    price: number;

    @Column("boolean", { default: true })
    active: boolean;

    @CreateDateColumn()
    created: Date;

    @ManyToOne(() => User, (user) => user.offers)
    public creator: User;

    @ManyToOne(() => Vehicle, (vehicle) => vehicle.offers)
    public vehicle: Vehicle;

    @OneToOne(() => Address, {
        onDelete: "RESTRICT",
    })
    @JoinColumn()
    public startAddress: Address;

    @OneToOne(() => Address, {
        onDelete: "RESTRICT",
    })
    @JoinColumn()
    public destAddress: Address;
}
