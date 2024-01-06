import { Schema } from '@app/common';
import { AbstractDocument } from '@app/common/database/abstract.schema';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Service } from 'src/services/schemas';
import { User } from 'src/users/schemas';
import { EBookingStatus } from '../enums';

@Schema()
export class Booking extends AbstractDocument {
  @Prop({ type: Types.ObjectId, ref: User.name })
  userId: string | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Service.name })
  serviceId: string | Types.ObjectId;

  @Prop({ type: String, enum: EBookingStatus, default: EBookingStatus.PENDING })
  status: EBookingStatus;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
