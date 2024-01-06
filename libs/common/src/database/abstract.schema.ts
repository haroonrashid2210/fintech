import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export class AbstractDocument {
  _id: Types.ObjectId;

  @Prop({ type: Date, required: false })
  createdAt: string;

  @Prop({ type: Date, required: false })
  updatedAt: string;
}
