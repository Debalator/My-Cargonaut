import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  private users: CreateUserDto[] = [
    {
      username: 'Harald',
      mail: 'harald@mail.de',
      password: 'secure'
    },
  ]

  create(user: CreateUserDto) {
    this.users.push(user);
  }

  findAll() {
    return this.users;
  }

  async findOne(username: string): Promise<CreateUserDto | undefined> {
    return this.users.find(user => user.username === username);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
