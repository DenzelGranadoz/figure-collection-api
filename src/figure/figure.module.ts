import { Module } from '@nestjs/common';
import { FigureService } from './figure.service';
import { FigureController } from './figure.controller';
import { Figure } from './entities/figure.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Figure])],
  providers: [FigureService],
  controllers: [FigureController],
})
export class FigureModule {}
