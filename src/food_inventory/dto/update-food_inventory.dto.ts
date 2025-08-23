import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodInventoryDto } from './create-food_inventory.dto';

export class UpdateFoodInventoryDto extends PartialType(CreateFoodInventoryDto) {}
