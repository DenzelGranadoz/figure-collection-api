import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}

  //   async findUserByName(username: string): Promise<Users | undefined> {
  //     return await this.userRepository.findOneBy()
  //   }

  async findUserByName(username: string): Promise<Users | null> {
    return await this.userRepository.findOneBy({ username });
  }
}
