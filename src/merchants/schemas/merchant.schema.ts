import { Schema } from '@app/common';
import { AbstractDocument } from '@app/common/database/abstract.schema';
import { Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Merchant extends AbstractDocument {
  @Prop({ unique: true })
  name: string;
}

export const MerchantSchema = SchemaFactory.createForClass(Merchant);
