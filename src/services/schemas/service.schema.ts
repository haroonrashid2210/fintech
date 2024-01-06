import { Schema } from '@app/common';
import { AbstractDocument } from '@app/common/database/abstract.schema';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Merchant } from '../../../src/merchants/schemas';

@Schema()
export class Service extends AbstractDocument {
  @Prop({ type: mongoose.Types.ObjectId, ref: Merchant.name })
  merchantId: string | mongoose.Types.ObjectId;

  @Prop()
  name: string;

  @Prop({ type: Number })
  price: number;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
