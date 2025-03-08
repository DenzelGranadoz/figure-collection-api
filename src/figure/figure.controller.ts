import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FigureService } from './figure.service';
import { CreateFigureDto } from './dto/create-figure.dto';
import { UpdateFigureDto } from './dto/update-figure.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('figure')
export class FigureController {
  constructor(private readonly figureService: FigureService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createFigureDto: CreateFigureDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.figureService.createFigure(createFigureDto, file);
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
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id') id: number,
    @Body() updateFigureDto: UpdateFigureDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.figureService.updateFigure(+id, updateFigureDto, file);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: number) {
    return this.figureService.removeFigure(id);
  }
}
