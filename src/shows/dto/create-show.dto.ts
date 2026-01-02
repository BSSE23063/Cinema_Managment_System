import { IsNotEmpty, IsInt, IsDateString } from 'class-validator';

export class CreateShowDto {
  @IsDateString()
  @IsNotEmpty()
  start_time: Date;

  @IsDateString()
  @IsNotEmpty()
  end_time: Date;

  @IsInt()
  @IsNotEmpty()
  hall_id: number;

  @IsInt()
  @IsNotEmpty()
  movie_id: number;
}
