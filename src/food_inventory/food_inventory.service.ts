import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FoodInventory } from './entities/food_inventory.entity';
import { CreateFoodInventoryDto } from './dto/create-food_inventory.dto';
import { UpdateFoodInventoryDto } from './dto/update-food_inventory.dto';

@Injectable()
export class FoodInventoryService {
  constructor(
    @InjectRepository(FoodInventory)
    private readonly foodInventoryRepository: Repository<FoodInventory>,
  ) {}

  async create(createFoodInventoryDto: CreateFoodInventoryDto) {
    const foodInventory = this.foodInventoryRepository.create(
      createFoodInventoryDto,
    );
    return await this.foodInventoryRepository.save(foodInventory);
  }

  async findAll() {
    return await this.foodInventoryRepository.find();
  }

  async findOne(id: number) {
    const foodInventory = await this.foodInventoryRepository.findOne({
      where: { id },
    });
    if (!foodInventory) {
      throw new NotFoundException(`FoodInventory with ID ${id} not found`);
    }
    return foodInventory;
  }

  async update(id: number, updateFoodInventoryDto: UpdateFoodInventoryDto) {
    const foodInventory = await this.findOne(id);
    if (!foodInventory) {
      throw new NotFoundException(`FoodInventory with ID ${id} not found`);
    }
    const updated = Object.assign(foodInventory, updateFoodInventoryDto);
    return await this.foodInventoryRepository.save(updated);
  }

  async remove(id: number) {
    const result = await this.foodInventoryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`FoodInventory with ID ${id} not found`);
    }
  }
}
