import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateBlacklistDto } from './dto/create-blacklist.dto';
import { UpdateBlacklistDto } from './dto/update-blacklist.dto';
import { Blacklist } from './entities/blacklist.entity';

@Injectable()
export class BlacklistService {
  constructor(
    @InjectRepository(Blacklist)
    private readonly blacklistRepository: Repository<Blacklist>,
  ) {}

  async create(createBlacklistDto: CreateBlacklistDto) {
    
    const existing = await this.blacklistRepository.findOne({
      where: { token: createBlacklistDto.token }, 
    });

    if (existing) {
      throw new ConflictException(
        `Entry "${createBlacklistDto.token}" is already blacklisted`,
      );
    }

    const entry = this.blacklistRepository.create(createBlacklistDto);
    return await this.blacklistRepository.save(entry);
  }

  async findAll() {
    return await this.blacklistRepository.find();
  }

  async findOne(id: number) {
    const entry = await this.blacklistRepository.findOne({
      where: { id },
    });

    if (!entry) {
      throw new NotFoundException(`Blacklist entry with ID ${id} not found`);
    }

    return entry;
  }

  async update(id: number, updateBlacklistDto: UpdateBlacklistDto) {
    const entry = await this.findOne(id);

    Object.assign(entry, updateBlacklistDto);

    return await this.blacklistRepository.save(entry);
  }

  async remove(id: number) {
    const result = await this.blacklistRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Blacklist entry with ID ${id} not found`);
    }
  }

   async findOnebytoken(tokens:string):Promise<boolean> {
    const entry = await this.blacklistRepository.findOne({
      where: { token:tokens },
    });

    if (entry) {
      return true
    }

    return false;
  }
}
