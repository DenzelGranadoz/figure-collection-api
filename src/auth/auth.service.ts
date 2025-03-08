import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignupDto } from './dto/signup.dto';
import { Users } from 'src/users/users.entity';

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
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticate(input: AuthInput): Promise<AuthResult> {
    const user = await this.validateUser(input);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.signIn(user);
  }

  async validateUser(input: AuthInput): Promise<SignInData | null> {
    const user = await this.userService.findUserByName(input.username);

    if (user && (await user.validatePassword(input.password))) {
      return {
        id: user.id,
        username: user.username,
      };
    }

    return null;
  }

  async signIn(user: SignInData): Promise<AuthResult> {
    const tokenPayload = {
      sub: user.id,
      username: user.username,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload);
    return { accessToken, username: user.username, id: user.id };
  }

  async signUp(user: SignupDto): Promise<Users> {
    return this.userService.create(user);
  }
}
