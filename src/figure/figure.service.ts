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

@Injectable()
export class FigureService {
  constructor(
    @InjectRepository(Figure) private figureRepository: Repository<Figure>,
  ) {}

  async createFigure(createFigureDto: CreateFigureDto): Promise<Figure> {
    if (
      !createFigureDto.name ||
      !createFigureDto.price ||
      !createFigureDto.imageUrl
    ) {
      throw new BadRequestException('All fields are required');
    }
    const figure: Figure = new Figure();
    figure.name = createFigureDto.name;
    figure.price = createFigureDto.price;
    figure.imageUrl = createFigureDto.imageUrl;

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
