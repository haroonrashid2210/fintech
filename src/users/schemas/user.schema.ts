import { Schema } from '@app/common';
import { AbstractDocument } from '@app/common/database/abstract.schema';
import { Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UserDocument extends AbstractDocument {
  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
