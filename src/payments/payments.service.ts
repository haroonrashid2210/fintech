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

  /**
   * The create function creates a payment record and updates the status of a booking to "BOOKED".
   * @param {IUser} user - The "user" parameter is an object of type IUser, which represents the user
   * who is creating the payment. It likely contains information about the user, such as their ID,
   * name, email, etc.
   * @param {CreatePaymentDto} createPaymentDto - The `createPaymentDto` parameter is an object that
   * contains the data needed to create a payment. It likely includes properties such as the payment
   * amount, payment method, and any other relevant payment details.
   * @returns The `payment` object is being returned.
   */
  async create(user: IUser, createPaymentDto: CreatePaymentDto) {
    const payment = await this.paymentModel.create({ ...createPaymentDto, userId: user._id });
    await this.bookingService.updateOne(
      { _id: createPaymentDto.bookingId },
      { $set: { status: EBookingStatus.BOOKED } },
    );
    return payment;
  }

  /**
   * The `findAll` function retrieves all payments associated with a given user.
   * @param {IUser} user - The `user` parameter is an object of type `IUser`.
   * @returns a promise that resolves to an array of payment documents that match the given user's ID.
   */
  async findAll(user: IUser) {
    return await this.paymentModel.find({ userId: user._id });
  }
}
