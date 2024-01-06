import { Schema } from '@app/common';
import { AbstractDocument } from '@app/common/database/abstract.schema';
import { Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User extends AbstractDocument {
  @Prop({ unique: true })
  email: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  password: string;

  @Prop({ default: '', required: false })
  verificationCode?: string;

  @Prop({ default: false, required: false })
  isEmailVerified?: boolean;

  @Prop({ default: '', type: Date, required: false })
  lastLoginAt?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
