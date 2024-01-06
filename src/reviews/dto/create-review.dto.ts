import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsNumber, Min, Max } from 'class-validator';
import { Types } from 'mongoose';

export class CreateReviewDto {
  @IsNotEmpty()
  @Transform((value) => new Types.ObjectId(value.value))
  serviceId: string;

  @IsNumber()
  @Min(1)
  @Max(10)
  rating: number;

  @IsNotEmpty()
  @IsString()
  comment: string;
}
