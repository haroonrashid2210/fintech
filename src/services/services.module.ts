import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { Service, ServiceSchema } from './schemas';
import { DatabaseModule } from '@app/common';
import { ServicesRepository } from './services.repository';

@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([{ name: Service.name, schema: ServiceSchema }])],
  controllers: [ServicesController],
  providers: [ServicesRepository, ServicesService],
  exports: [ServicesService],
})
export class ServicesModule {}
