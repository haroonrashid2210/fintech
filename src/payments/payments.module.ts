import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { DatabaseModule } from '@app/common';
import { Payment, PaymentSchema } from './schemas';
import { BookingsModule } from 'src/bookings/bookings.module';

@Module({
  imports: [DatabaseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]), BookingsModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
