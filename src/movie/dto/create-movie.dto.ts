import { IsInt, IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateMovieDto {
  

  @IsString()
  @IsNotEmpty()
  @Length(1, 100) 
  name: string; 

  @IsString()
  @IsNotEmpty()
  @Length(1, 255)   
  description: string;  

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)    
  genre: string;    
}
