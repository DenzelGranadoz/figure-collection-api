import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Figure } from './entities/figure.entity';
import { Repository } from 'typeorm';
import { CreateFigureDto } from './dto/create-figure.dto';
import { UpdateFigureDto } from './dto/update-figure.dto';
import { UploadService } from 'src/upload/upload.service';

@Injectable()
export class FigureService {
  constructor(
    @InjectRepository(Figure) private figureRepository: Repository<Figure>,
    private readonly uploadService: UploadService,
  ) {}

  async createFigure(
    createFigureDto: CreateFigureDto,
    file?: Express.Multer.File,
  ): Promise<Figure> {
    if (!createFigureDto.name || !createFigureDto.price) {
      throw new BadRequestException('All fields are required');
    }

    const imageUrl = file ? await this.uploadService.uploadFile(file) : '';

    const figure: Figure = new Figure();
    figure.name = createFigureDto.name;
    figure.price = createFigureDto.price;
    figure.imageUrl = imageUrl;

    return await this.figureRepository.save(figure);
  }

  async getAllFigures(page: number, limit: number): Promise<Figure[]> {
    if (page < 1 || limit < 1) {
      throw new BadRequestException('Page and limit must be more than 0');
    }

    return await this.figureRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async getFigureById(id: number): Promise<Figure | null> {
    const figure = await this.figureRepository.findOneBy({ id });

    if (!figure) throw new NotFoundException(`Figure with ID ${id} not found`);

    return figure;
  }

  async updateFigure(
    id: number,
    updateFigureDto: UpdateFigureDto,
  ): Promise<Figure> {
    const figure: Figure = new Figure();
    figure.name = updateFigureDto.name;
    figure.price = updateFigureDto.price;
    figure.imageUrl = updateFigureDto.imageUrl;
    figure.id = id;
    return await this.figureRepository.save(figure);
  }

  async removeFigure(id: number): Promise<{ affected?: number | null }> {
    const figure = await this.figureRepository.findOneBy({ id });
    if (!figure) throw new NotFoundException(`Figure with ID ${id} not found`);

    return await this.figureRepository.delete(id);
  }
}
