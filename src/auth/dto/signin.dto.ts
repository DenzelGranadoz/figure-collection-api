import { IsNumber, IsString } from 'class-validator';

export class SignInDto {
  @IsNumber()
  id: number;

  @IsString()
  username: string;
}
