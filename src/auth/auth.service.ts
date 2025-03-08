import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

type AuthInput = {
  username: string;
  password: string;
};

type SignInData = {
  id: number;
  username: string;
};

type AuthResult = {
  accessToken: string;
  id: number;
  username: string;
};

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async authenticate(input: AuthInput): Promise<AuthResult> {
    const user = await this.validateUser(input);

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      accessToken: 'fake-access',
      id: user.id,
      username: user.username,
    };
  }

  async validateUser(input: AuthInput): Promise<SignInData | null> {
    const user = await this.userService.findUserByName(input.username);

    if (user && user.password == input.password) {
      return {
        id: user.id,
        username: user.username,
      };
    }

    return null;
  }
}
