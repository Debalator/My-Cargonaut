import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  private users: CreateUserDto[] = []
  private readonly saltRounds = 10;

  async create(user: CreateUserDto) {
    const hash = await bcrypt.hash(user.password, this.saltRounds);
    user.password = hash;
    return this.users.push(user);
  }

  findAll() {
    return this.users;
  }

  async findOne(username: string): Promise<CreateUserDto | undefined> {
    return this.users.find(user => user.username === username);
  }

  update(username: string, updateUserDto: UpdateUserDto) {
    let user = this.users.find(user => user.username === username)[0];
    const index = this.users?.findIndex(user);

    user = updateUserDto;

    this.users[index] = user;
    return user;
  }

  remove(username: string) {
    const user = this.users.find(user => user.username === username)[0];
    const index = this.users?.indexOf(user);
    if (index > -1)
      return this.users.splice(index, 1);
    return null;
  }
}
