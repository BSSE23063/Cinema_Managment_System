import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FoodInventoryService } from './food_inventory.service';
import { CreateFoodInventoryDto } from './dto/create-food_inventory.dto';
import { UpdateFoodInventoryDto } from './dto/update-food_inventory.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorators';

@UseGuards(JwtAuthGuard, RoleGuard)
@Roles('admin')
@Controller('food-inventory')
export class FoodInventoryController {
  constructor(private readonly foodInventoryService: FoodInventoryService) {}

  @Post()
  create(@Body() createFoodInventoryDto: CreateFoodInventoryDto) {
    return this.foodInventoryService.create(createFoodInventoryDto);
  }

  @Get()
  findAll() {
    return this.foodInventoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodInventoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoodInventoryDto: UpdateFoodInventoryDto) {
    return this.foodInventoryService.update(+id, updateFoodInventoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodInventoryService.remove(+id);
  }
}
