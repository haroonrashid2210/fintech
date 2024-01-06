import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class VerifyEmailDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  verificationCode: string;
}
