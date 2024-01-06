import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Booking } from './schemas';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { IUser } from '@app/common';

@Injectable()
export class BookingsService {
  constructor(@InjectModel(Booking.name) private readonly bookingModel: Model<Booking>) {}

  async create(user: IUser, createBookingDto: CreateBookingDto) {
    return await this.bookingModel.create({ ...createBookingDto, userId: user._id });
  }

  async findOne(filter: FilterQuery<Booking>) {
    return await this.bookingModel.findOne(filter);
  }

  async updateOne(filter: FilterQuery<Booking>, update: UpdateQuery<Booking>) {
    return await this.bookingModel.updateOne(filter, update);
  }
}
