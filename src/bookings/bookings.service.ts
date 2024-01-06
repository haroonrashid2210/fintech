import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Booking } from './schemas';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { IUser } from '@app/common';

@Injectable()
export class BookingsService {
  constructor(@InjectModel(Booking.name) private readonly bookingModel: Model<Booking>) {}

  /**
   * The create function creates a new booking record with the provided user and booking data.
   * @param {IUser} user - The user parameter is an object of type IUser, which represents the user who
   * is creating the booking. It contains information about the user, such as their ID (user._id).
   * @param {CreateBookingDto} createBookingDto - The `createBookingDto` parameter is an object that
   * contains the data needed to create a booking. It likely includes properties such as `startDate`,
   * `endDate`, `location`, and any other relevant information for the booking.
   * @returns The create method is returning a promise that resolves to the created booking object.
   */
  async create(user: IUser, createBookingDto: CreateBookingDto) {
    return await this.bookingModel.create({ ...createBookingDto, userId: user._id });
  }

  /**
   * The `findAll` function retrieves all bookings associated with a given user.
   * @param {IUser} user - The `user` parameter is an object of type `IUser`.
   * @returns a promise that resolves to an array of booking documents that match the given user's ID.
   */
  async findAll(user: IUser) {
    return await this.bookingModel.find({ userId: user._id });
  }

  /**
   * The function findOne asynchronously finds and returns a single document from the bookingModel
   * collection based on the provided filter.
   * @param filter - The filter parameter is an object that specifies the conditions that the document
   * must meet in order to be returned. It is used to query the database and find a single document
   * that matches the specified filter criteria.
   * @returns The `findOne` method is returning a promise that resolves to the result of the `findOne`
   * operation on the `bookingModel` with the specified filter.
   */
  async findOne(filter: FilterQuery<Booking>) {
    return await this.bookingModel.findOne(filter);
  }

  /**
   * The function updates a single document in the booking collection based on the provided filter and
   * update criteria.
   * @param filter - The filter parameter is used to specify the criteria for selecting the document(s)
   * to update. It can be an object that contains key-value pairs representing the fields and their
   * values that the documents must match in order to be updated. For example, { status: "pending" }
   * would select all documents with
   * @param update - The `update` parameter is an object that specifies the changes to be made to the
   * document(s) that match the `filter` parameter. It can include various update operators such as
   * ``, ``, ``, etc. The `update` object is used to update the fields of the
   * @returns the result of the `updateOne` method call on the `bookingModel`.
   */
  async updateOne(filter: FilterQuery<Booking>, update: UpdateQuery<Booking>) {
    return await this.bookingModel.updateOne(filter, update);
  }
}
