import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FigureService } from './figure.service';
import { CreateFigureDto } from './dto/create-figure.dto';
import { UpdateFigureDto } from './dto/update-figure.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('figure')
export class FigureController {
  constructor(private readonly figureService: FigureService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createFigureDto: CreateFigureDto) {
    return this.figureService.createFigure(createFigureDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.figureService.getAllFigures(page, limit);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: number) {
    return this.figureService.getFigureById(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: number, @Body() updateFigureDto: UpdateFigureDto) {
    return this.figureService.updateFigure(+id, updateFigureDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: number) {
    return this.figureService.removeFigure(id);
  }
}
