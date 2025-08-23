import { IsInt, IsNumber, IsOptional, IsString, IsDateString, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateFoodOrderDto } from 'src/food_order/dto/create-food_order.dto';

export class UpdateBookingDto {
  @IsInt()
  @IsOptional()
  user_id?: number;

  @IsInt()
  @IsOptional()
  movie_id?: number;

  @IsInt()
  @IsOptional()
  hall_id?: number;

  @IsString()
  @IsOptional()
  seat_no?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsDateString()
  @IsOptional()
  date?: string;

  @IsDateString()
  @IsOptional()
  time?: string;

  @IsInt()
  @IsOptional()
  ticket_quantity?: number;

  // 🔹 One booking → many food orders (each order has a single foodId)
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFoodOrderDto)
  @IsOptional()
  foodOrders?: CreateFoodOrderDto[];
}
