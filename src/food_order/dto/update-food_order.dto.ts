import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodOrderDto } from './create-food_order.dto';

export class UpdateFoodOrderDto extends PartialType(CreateFoodOrderDto) {}
