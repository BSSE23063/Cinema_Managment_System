import { IsString, IsNotEmpty, Length, IsInt } from 'class-validator';

export class CreateHallDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  hall_no: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  category: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 10)
  seat_no: string;

  @IsInt()
  @IsNotEmpty()
  price: number;
}
