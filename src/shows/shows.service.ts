import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShowDto } from './dto/create-show.dto';
import { UpdateShowDto } from './dto/update-show.dto';
import { Show } from './entities/show.entity';
import { Hall } from 'src/halls/entities/hall.entity';
import { Movie } from 'src/movie/entities/movie.entity';

@Injectable()
export class ShowsService {
  constructor(
    @InjectRepository(Show)
    private readonly showRepo: Repository<Show>,

    @InjectRepository(Hall)
    private readonly hallRepo: Repository<Hall>,

    @InjectRepository(Movie)
    private readonly movieRepo: Repository<Movie>,
  ) {}

  async create(createShowDto: CreateShowDto): Promise<Show> {
    const hall = await this.hallRepo.findOne({ where: { id: createShowDto.hall_id } });
    if (!hall) throw new NotFoundException(`Hall #${createShowDto.hall_id} not found`);

    const movie = await this.movieRepo.findOne({ where: { id: createShowDto.movie_id } });
    if (!movie) throw new NotFoundException(`Movie #${createShowDto.movie_id} not found`);

    const show = this.showRepo.create({
      start_time: createShowDto.start_time,
      end_time: createShowDto.end_time,
      hall,
      movie,
    });

    return this.showRepo.save(show);
  }

  findAll(): Promise<Show[]> {
    return this.showRepo.find({
      relations: ['hall', 'movie'],
    });
  }

  async findOne(id: number): Promise<Show> {
    const show = await this.showRepo.findOne({
      where: { id },
      relations: ['hall', 'movie'],
    });
    if (!show) throw new NotFoundException(`Show #${id} not found`);
    return show;
  }

  async update(id: number, updateShowDto: UpdateShowDto): Promise<Show> {
    const show = await this.findOne(id);

    if (updateShowDto.hall_id) {
      const hall = await this.hallRepo.findOne({ where: { id: updateShowDto.hall_id } });
      if (!hall) throw new NotFoundException(`Hall #${updateShowDto.hall_id} not found`);
      show.hall = hall;
    }

    if (updateShowDto.movie_id) {
      const movie = await this.movieRepo.findOne({ where: { id: updateShowDto.movie_id } });
      if (!movie) throw new NotFoundException(`Movie #${updateShowDto.movie_id} not found`);
      show.movie = movie;
    }

    if (updateShowDto.start_time) show.start_time = updateShowDto.start_time;
    if (updateShowDto.end_time) show.end_time = updateShowDto.end_time;

    return this.showRepo.save(show);
  }

  async remove(id: number): Promise<void> {
    const show = await this.findOne(id);
    await this.showRepo.remove(show);
  }
}
