import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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

  /**
   * Create a new food order
   */
  async create(createFoodOrderDto: CreateFoodOrderDto) {
    const { booking_id, food_id, order_quantity } = createFoodOrderDto;

    // Validate booking
    const booking = await this.bookingService.findOne(booking_id);
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${booking_id} not found`);
    }

    const foodItems: FoodInventory[] = [];
    let totalPrice = 0;

    // Validate and calculate order
    for (let i = 0; i < food_id.length; i++) {
      const foodItem = await this.foodInventoryService.findOne(food_id[i]);
      const quantity = order_quantity[i];

      if (!foodItem) {
        throw new NotFoundException(`Food item with ID ${food_id[i]} not found`);
      }

      // Check stock
      if (foodItem.quantity < quantity) {
        throw new BadRequestException(
          `Not enough quantity for "${foodItem.item}". Available: ${foodItem.quantity}, Requested: ${quantity}`,
        );
      }

      // Update inventory (decrease quantity)
      foodItem.quantity -= quantity;
      await this.foodInventoryService.update(foodItem.id, { quantity: foodItem.quantity });

      // Add price to total
      totalPrice += foodItem.price * quantity;

      // Add to ordered food list
      foodItems.push(foodItem);
    }
    
    // Create new order
    const foodOrder = this.foodOrderRepository.create({
      amount:totalPrice,
      booking,
      foodItems,
      order_quantity
      
    });

    return await this.foodOrderRepository.save(foodOrder);
  }

  /**
   * Get all food orders (admin only)
   */
  async findAll() {
    return await this.foodOrderRepository.find({
      relations: ['booking', 'foodItems'],
    });
  }

  /**
   * Get single food order by ID
   */
  async findOne(id: number) {
    const foodOrder = await this.foodOrderRepository.findOne({
      where: { id },
      relations: ['booking', 'foodItems'],
    });

    if (!foodOrder) {
      throw new NotFoundException(`FoodOrder with ID ${id} not found`);
    }

    return foodOrder;
  }

  /**
   * Update a food order
   */
  async update(id: number, updateFoodOrderDto: UpdateFoodOrderDto) {
    const foodOrder = await this.findOne(id);

    if (updateFoodOrderDto.booking_id) {
      const booking = await this.bookingService.findOne(updateFoodOrderDto.booking_id);
      if (!booking)
        throw new NotFoundException(
          `Booking with ID ${updateFoodOrderDto.booking_id} not found`,
        );
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

    Object.assign(foodOrder, updateFoodOrderDto);
    return await this.foodOrderRepository.save(foodOrder);
  }

  /**
   * Delete a food order
   */
  async remove(id: number) {
    const result = await this.foodOrderRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`FoodOrder with ID ${id} not found`);
    }
  }

  /**
   * Get available food inventory
   */
  async getInventoryData() {
    const result = await this.foodInventoryService.findAll();
    if (!result || result.length === 0) {
      throw new NotFoundException('FoodItems are not found');
    }
    return result;
  }
}
