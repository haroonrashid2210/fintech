import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateBookingDto {
  @IsNotEmpty()
  @Transform((value) => new Types.ObjectId(value.value))
  serviceId: string;
}
