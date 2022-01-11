import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcrypt";
import { getConnection, getRepository } from "typeorm";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
    private readonly saltRounds = 10;

    async create(createUser: CreateUserDto) {
        createUser.password = await bcrypt.hash(
            createUser.password,
            this.saltRounds
        );
        const user = await getRepository(User).create(createUser);
        return await getRepository(User).save(user);
    }

    async findAll(): Promise<User[]> {
        return await getRepository(User).find({
            select: ["id", "username", "profilePicturePath"],
        });
    }

    async findOne(id: number): Promise<User> {
        return await getRepository(User).findOne(id, {
            select: ["id", "username", "profilePicturePath", "mail"],
        });
    }

    async findIdByName(username: string): Promise<User> {
        return await getRepository(User).findOne({ where: { username } });
    }

    async update(id: number, updateUser: UpdateUserDto) {
        if (updateUser.password)
            updateUser.password = await bcrypt.hash(
                updateUser.password,
                this.saltRounds
            );

        const user = await getRepository(User).findOne(id);
        if (!user) throw new BadRequestException();

        getRepository(User).merge(user, updateUser);
        return await getRepository(User).save(user);
    }

    async remove(id: number) {
        return await getRepository(User).delete(id);
    }

    async addProfilePicture(id: number, path: string) {
        return await getConnection()
            .createQueryBuilder()
            .update(User)
            .set({ profilePicturePath: path })
            .where("id = :id", { id })
            .execute();
    }
}
