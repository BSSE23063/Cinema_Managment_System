import { IsString, IsInt, IsNumber, IsNotEmpty, Length } from 'class-validator';

export class CreateFoodInventoryDto {
    
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  items: string;

  @IsInt()
  quantity: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

  
}
