import { IsString, IsNotEmpty, Length, IsInt, Min } from 'class-validator';

export class CreateHallDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  hall_no: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  category: string;

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  price: number;
}
