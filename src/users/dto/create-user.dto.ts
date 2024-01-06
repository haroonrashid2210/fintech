import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsOptional()
  @IsString()
  verificationCode?: string;
}
