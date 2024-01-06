import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Payment } from './schemas';
import { Model } from 'mongoose';
import { IUser } from '@app/common';
import { BookingsService } from 'src/bookings/bookings.service';
import { EBookingStatus } from 'src/bookings/enums';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name) private readonly paymentModel: Model<Payment>,
    private readonly bookingService: BookingsService,
  ) {}

  async create(user: IUser, createPaymentDto: CreatePaymentDto) {
    const payment = await this.paymentModel.create({ ...createPaymentDto, userId: user._id });
    await this.bookingService.updateOne(
      { _id: createPaymentDto.bookingId },
      { $set: { status: EBookingStatus.BOOKED } },
    );
    return payment;
  }
}
