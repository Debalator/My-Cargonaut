import { Body, Controller, Post, Res } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('users')
export class UsersController {
    @Post()
    registerUser(@Body() body: RegisterUserDto, @Res() res: Response) {
        //check if body.name already exists
        //check if body.mail already exists
        //use bcrypt to hash password an store data in DB
            //return token/session to user
    }
}
