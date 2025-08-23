import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHallDto } from './dto/create-hall.dto';
import { UpdateHallDto } from './dto/update-hall.dto';
import { Hall } from './entities/hall.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class HallsService {
  constructor(
    @InjectRepository(Hall)
    private readonly hallRepository: Repository<Hall>,
  ) {}

  async create(createHallDto: CreateHallDto) {
    const hall = this.hallRepository.create(createHallDto);
    return await this.hallRepository.save(hall);
  }

  async findAll() {
    return await this.hallRepository.find({ relations: ['bookings'] });
  }

  async findOne(id: number) {
    const hall = await this.hallRepository.findOne({
      where: { id },
      relations: ['bookings'],
    });
    if (!hall) {
      throw new NotFoundException(`Hall with ID ${id} not found`);
    }
    return hall;
  }

async update(id: number, updateHallDto: UpdateHallDto) {
  const hall = await this.findOne(id);
  if (!hall) {
    throw new NotFoundException(`Hall with ID ${id} not found`);
  }

  Object.assign(hall, updateHallDto);
  return await this.hallRepository.save(hall);
}


  async remove(id: number) {
    const result = await this.hallRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Hall with ID ${id} not found`);
    }
  }
}
