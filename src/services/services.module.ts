import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { Service, ServiceSchema } from './schemas';
import { DatabaseModule } from '@app/common';
import { ReviewsModule } from '../../src/reviews/reviews.module';

@Module({
  imports: [DatabaseModule.forFeature([{ name: Service.name, schema: ServiceSchema }]), ReviewsModule],
  controllers: [ServicesController],
  providers: [ServicesService],
  exports: [ServicesService],
})
export class ServicesModule {}
