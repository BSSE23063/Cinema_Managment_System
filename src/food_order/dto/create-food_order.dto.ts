import { IsInt, IsNumber, IsNotEmpty, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateFoodOrderDto {
 


  @IsInt()
  booking_id: number;

  @IsArray()
  @ArrayNotEmpty()
  food_id: number[];
}
