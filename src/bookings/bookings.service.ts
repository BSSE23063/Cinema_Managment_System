import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { UsersService } from 'src/users/users.service';
import { MovieService } from 'src/movie/movie.service';
import { HallsService } from 'src/halls/halls.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    private readonly usersService: UsersService,
    private readonly moviesService: MovieService,
    private readonly hallsService: HallsService,
  ) {}

  async create(createBookingDto: CreateBookingDto) {
    const { user_id, movie_id, hall_id, ...rest } = createBookingDto;

    if (!user_id || !movie_id || !hall_id) {
      throw new BadRequestException('user_id, movie_id, hall_id are required');
    }

    const user = await this.usersService.findOne(user_id);
    const movie = await this.moviesService.findOne(movie_id);
    const hall = await this.hallsService.findOne(hall_id);

    if (!user || !movie || !hall) {
      throw new NotFoundException('Related entity not found');
    }

    const booking = this.bookingRepository.create({
      ...rest,
      user,
      movie,
      hall,
    });

    return await this.bookingRepository.save(booking);
  }

  findAll() {
    return this.bookingRepository.find({
      relations: ['hall', 'user', 'movie'],
    });
  }

  async findOne(id: number) {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: ['hall', 'user', 'movie'],
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return booking;
  }

  async update(id: number, updateBookingDto: UpdateBookingDto) {
    const booking = await this.findOne(id);
    const { hall_id, user_id, movie_id, foodOrders, ...bookingData } =
      updateBookingDto;

    if (!user_id || !movie_id || !hall_id) {
      throw new BadRequestException('user_id, movie_id, hall_id are required');
    }

    const user = await this.usersService.findOne(user_id);
    const movie = await this.moviesService.findOne(movie_id);
    const hall = await this.hallsService.findOne(hall_id);

    if (!user || !movie || !hall) {
      throw new NotFoundException('Related entity not found');
    }

    Object.assign(booking, updateBookingDto);

    return this.bookingRepository.save(booking);
  }

  async remove(id: number) {
    const target = await this.findOne(id);
    return this.bookingRepository.remove(target);
  }
}
