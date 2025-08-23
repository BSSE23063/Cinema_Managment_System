import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FoodOrder } from './entities/food_order.entity';
import { CreateFoodOrderDto } from './dto/create-food_order.dto';
import { UpdateFoodOrderDto } from './dto/update-food_order.dto';

import { FoodInventoryService } from 'src/food_inventory/food_inventory.service';
import { BookingsService } from 'src/bookings/bookings.service';
import { FoodInventory } from 'src/food_inventory/entities/food_inventory.entity';

@Injectable()
export class FoodOrderService {
  constructor(
    @InjectRepository(FoodOrder)
    private readonly foodOrderRepository: Repository<FoodOrder>,

    private readonly foodInventoryService: FoodInventoryService,
    private readonly bookingService: BookingsService,
  ) {}

  
  async create(createFoodOrderDto: CreateFoodOrderDto) {
    const { booking_id, food_id } = createFoodOrderDto;

    
    const booking = await this.bookingService.findOne(booking_id);
    if (!booking) throw new NotFoundException(`Booking with ID ${booking_id} not found`);

    
    const foodItems: FoodInventory[] = [];
    let foodPrice=0;
    for (const foodId of food_id) {
      const food = await this.foodInventoryService.findOne(foodId);
      if (!food) throw new NotFoundException(`Food item with ID ${foodId} not found`);
      let x=food.price*food.quantity;
      foodPrice+=x;
      foodItems.push(food);
    }

    
    const foodOrder = this.foodOrderRepository.create({
      
      amount:foodPrice,
      booking,
      foodItems,
    });

    return await this.foodOrderRepository.save(foodOrder);
  }

  
  async findAll() {
    return await this.foodOrderRepository.find({
      relations: ['booking', 'foodItems'],
    });
  }

  
  async findOne(id: number){
    const foodOrder = await this.foodOrderRepository.findOne({
      where: { id },
      relations: ['booking', 'foodItems'],
    });

    if (!foodOrder) {
      throw new NotFoundException(`FoodOrder with ID ${id} not found`);
    }

    return foodOrder;
  }

  
  async update(id: number, updateFoodOrderDto: UpdateFoodOrderDto) {
    const foodOrder = await this.findOne(id);

    if (updateFoodOrderDto.booking_id) {
      const booking = await this.bookingService.findOne(updateFoodOrderDto.booking_id);
      if (!booking) throw new NotFoundException(`Booking with ID ${updateFoodOrderDto.booking_id} not found`);
      foodOrder.booking = booking;
    }

    if (updateFoodOrderDto.food_id) {
      const foodItems: FoodInventory[] = [];
      for (const foodId of updateFoodOrderDto.food_id) {
        const food = await this.foodInventoryService.findOne(foodId);
        if (!food) throw new NotFoundException(`Food item with ID ${foodId} not found`);
        foodItems.push(food);
      }
      foodOrder.foodItems = foodItems;
    }
    Object.assign(foodOrder,updateFoodOrderDto);

    return await this.foodOrderRepository.save(foodOrder);
  }

 
  async remove(id: number) {
    const result = await this.foodOrderRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`FoodOrder with ID ${id} not found`);
    }
  }
}
