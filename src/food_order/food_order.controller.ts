import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FoodOrderService } from './food_order.service';
import { CreateFoodOrderDto } from './dto/create-food_order.dto';
import { UpdateFoodOrderDto } from './dto/update-food_order.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorators';

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('food-order')
export class FoodOrderController {
  constructor(private readonly foodOrderService: FoodOrderService) {}

  // Only admin can create food orders
  @Roles('admin', 'customer')
  @Post()
  create(@Body() createFoodOrderDto: CreateFoodOrderDto) {
    return this.foodOrderService.create(createFoodOrderDto);
  }

  // Only admin can view all orders
  @Roles('admin')
  @Get()
  findAll() {
    return this.foodOrderService.findAll();
  }

  // Only admin can view a specific order
  @Roles('admin')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodOrderService.findOne(+id);
  }

  // Only admin can update food orders
  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoodOrderDto: UpdateFoodOrderDto) {
    return this.foodOrderService.update(+id, updateFoodOrderDto);
  }

  // Only admin can delete food orders
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodOrderService.remove(+id);
  }

  // ✅ Both admin and customer can access inventory data
  @Roles('admin', 'customer')
  @Get('/inventory/all')
  getInventoryData() {
    return this.foodOrderService.getInventoryData(); 
  }
}
