import {
  IsString,
  IsEmail,
  Length,
  IsNotEmpty,
  Matches,
  IsOptional,
  IsInt,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9+\-() ]{7,15}$/, { message: 'Invalid phone number format' })
  phoneNo: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 100, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsInt()
  @IsNotEmpty()
  role_id: number;
}
