import { Schema } from '@app/common';
import { AbstractDocument } from '@app/common/database/abstract.schema';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from 'src/users/schemas';
import { EPaymentMethod } from '../enums';
import { Booking } from 'src/bookings/schemas';

@Schema()
export class Payment extends AbstractDocument {
  @Prop({ type: Types.ObjectId, ref: User.name })
  userId: string | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Booking.name })
  bookingId: string | Types.ObjectId;

  @Prop({ type: String, enum: EPaymentMethod })
  method: EPaymentMethod;

  @Prop({ type: Number })
  amount: number;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
