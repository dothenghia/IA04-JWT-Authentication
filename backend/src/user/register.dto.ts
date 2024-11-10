import { IsEmail, IsString, MinLength, IsOptional, Matches } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(6, { message: 'Username must be at least 6 characters long' })
  username: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsOptional()
  @Matches(/^0\d{9}$/, {
    message: 'Invalid phone number format (10 digits, starting with 0)',
  })
  phone?: string;
}
