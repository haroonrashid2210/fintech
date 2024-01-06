import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { EPaymentMethod } from '../enums';

export class CreatePaymentDto {
  @IsNotEmpty()
  @Transform((value) => new Types.ObjectId(value.value))
  bookingId: string;

  @IsString()
  @IsEnum(EPaymentMethod)
  method: EPaymentMethod;
}
