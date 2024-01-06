import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { Review, ReviewSchema } from './schemas';
import { DatabaseModule } from '@app/common';
import { BookingsModule } from 'src/bookings/bookings.module';

@Module({
  imports: [DatabaseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]), BookingsModule],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
