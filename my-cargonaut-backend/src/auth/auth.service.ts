import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    private readonly saltRounds = 10;

    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (!user) return null;
        const valid = await bcrypt.compare(pass, user.password); //user.password ist aus der DB das gehashte Passwort
        const { password, ...result } = user
        return result;
    }

    async login(user: any) {
        const payload = { username: user.username, mail: user.mail };
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
