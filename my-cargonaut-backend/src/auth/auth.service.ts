import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(id: number, pass: string): Promise<any> {
        const user = await this.usersService.findOne(id);
        if (!user) return null;
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
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
