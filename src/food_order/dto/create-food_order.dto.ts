import {
  IsInt,
  IsNumber,
  IsNotEmpty,
  IsArray,
  ArrayNotEmpty,
  ArrayMinSize,
} from 'class-validator';

export class CreateFoodOrderDto {
  @IsInt()
  booking_id: number;

  @IsInt()
  amount: number;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  food_id: number[];

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  order_quantity: number[];
}
