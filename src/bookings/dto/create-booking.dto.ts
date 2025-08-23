import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsDateString,
  ValidateNested,
} from 'class-validator';


export class CreateBookingDto {

  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  time: string;

  @IsInt()
  @IsNotEmpty()
  ticket_quantity: number;

  
  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @IsInt()
  @IsNotEmpty()
  movie_id: number;

  @IsInt()
  @IsNotEmpty()
  hall_id: number;

  

  
}
