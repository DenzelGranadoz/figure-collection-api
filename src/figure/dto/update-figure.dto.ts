import { IsDecimal, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateFigureDto {
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
