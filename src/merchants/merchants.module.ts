import { Module } from '@nestjs/common';
import { MerchantsService } from './merchants.service';
import { MerchantsController } from './merchants.controller';
import { DatabaseModule } from '@app/common';
import { Merchant, MerchantSchema } from './schemas';
import { ServicesModule } from '../../src/services/services.module';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([{ name: Merchant.name, schema: MerchantSchema }]),
    ServicesModule,
  ],
  controllers: [MerchantsController],
  providers: [MerchantsService],
})
export class MerchantsModule {}
