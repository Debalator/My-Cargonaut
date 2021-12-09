import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('user should be created', () => {
    const user: CreateUserDto = {
      username: 'Harald',
      mail: 'harald@mail.de',
      password: 'secret'
    }
    service.create(user);
    console.log(service.findOne('Harald')[1])
    expect(service.findOne('Harald')[1] === user).toBeTruthy();
  });
});
