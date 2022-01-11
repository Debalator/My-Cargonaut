import { Controller, Request, Post, UseGuards, Get } from "@nestjs/common";
import { AuthService } from "./auth/auth.service";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { LocalAuthGuard } from "./auth/local-auth.guard";
import { UsersService } from "./users/users.service";

@Controller()
export class AppController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post("auth/login")
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get("profile")
    getProfile(@Request() req) {
        return this.userService.findOne(req.user.id);
    }
}
