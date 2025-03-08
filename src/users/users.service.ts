import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from 'src/auth/dto/signup.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}

  async findUserByName(username: string): Promise<Users | null> {
    return await this.userRepository.findOneBy({ username });
  }

  async create(signupInput: SignUpDto): Promise<Users> {
    const { password, username } = signupInput;
    const user = new Users();

    user.password = password;
    user.username = username;

    return this.userRepository.save(user);
  }
}
