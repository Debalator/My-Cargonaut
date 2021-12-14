import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UsersService } from "src/users/users.service";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private authService: AuthService,
        private userService: UsersService
    ) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        const userId = (await this.userService.findIdByName(username))?.id;
        if (!userId) throw new UnauthorizedException();
        const user = await this.authService.validateUser(userId, password);
        if (!user) throw new UnauthorizedException();
        return user;
    }
}
