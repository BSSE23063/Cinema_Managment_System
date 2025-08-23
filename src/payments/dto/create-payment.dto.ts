import {
  IsInt,
  IsString,
  IsNotEmpty,
  IsNumber,
  IsCreditCard,
  Length,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreatePaymentDto {
  @IsInt()
  booking_id: number;

 

  @IsCreditCard()
  card_number: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 5)
  expiry: string;

  @IsString()
  @Length(3, 4)
  cvv: string;

  @IsDateString()
  paid_at: string;

  @IsOptional()
  @IsInt()
  food_order_id?: number; 
}
