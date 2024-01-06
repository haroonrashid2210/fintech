import { SchemaOptions } from '@nestjs/mongoose';
import { Schema as MongooseSchema, SchemaFactory } from '@nestjs/mongoose';

// Custom decorator with default options
export function Schema(options: SchemaOptions = { versionKey: false, timestamps: true }) {
  return function (target: any) {
    MongooseSchema(options)(target);
    SchemaFactory.createForClass(target);
  };
}
