import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { getRepository } from "typeorm";
import { User } from "src/users/entities/user.entity";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(id: number, pass: string): Promise<any> {
        const user = await getRepository(User).findOne(id);
        if (!user && user.password && pass) return null;
        const valid = await bcrypt.compare(pass, user.password); //user.password ist aus der DB das gehashte Passwort
        if (!valid) return null;
        const { password, ...result } = user;
        return result;
    }

    async login(user: any) {
        const payload = {
            sub: user.id,
            username: user.username,
            mail: user.mail,
            profilePicturePath: user.profilePicturePath,
            birthDate: user.birthDate
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
