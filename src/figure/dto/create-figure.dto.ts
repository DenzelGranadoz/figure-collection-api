import { IsDecimal, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFigureDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDecimal()
  @IsNotEmpty()
  price: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
