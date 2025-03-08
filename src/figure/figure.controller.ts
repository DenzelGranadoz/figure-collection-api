import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { FigureService } from './figure.service';
import { CreateFigureDto } from './dto/create-figure.dto';
import { UpdateFigureDto } from './dto/update-figure.dto';

@Controller('figure')
export class FigureController {
  constructor(private readonly figureService: FigureService) {}

  @Post()
  create(@Body() createFigureDto: CreateFigureDto) {
    return this.figureService.createFigure(createFigureDto);
  }

  @Get()
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.figureService.getAllFigures(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.figureService.getFigureById(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateFigureDto: UpdateFigureDto) {
    return this.figureService.updateFigure(+id, updateFigureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.figureService.removeFigure(id);
  }
}
