import { Schema } from '@app/common';
import { AbstractDocument } from '@app/common/database/abstract.schema';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from 'src/users/schemas';
import { Booking } from 'src/bookings/schemas';

@Schema()
export class Review extends AbstractDocument {
  @Prop({ type: Types.ObjectId, ref: User.name })
  userId: string | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Booking.name })
  serviceId: string | Types.ObjectId;

  @Prop({ type: Number, min: 1, max: 10 })
  rating: number;

  @Prop({ type: String })
  comment: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
