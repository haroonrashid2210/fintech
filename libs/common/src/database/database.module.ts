import { Global, Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { ENV } from '../config';

@Global()
@Module({
  imports: [MongooseModule.forRoot(ENV.MONGODB_URI)],
})
export class DatabaseModule {
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models);
  }
}
