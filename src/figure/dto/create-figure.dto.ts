import { IsDecimal, IsNotEmpty, IsString } from 'class-validator';

export class CreateFigureDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDecimal()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  imageUrl: string;
}
