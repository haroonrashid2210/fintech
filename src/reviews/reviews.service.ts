import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { IUser } from '@app/common';
import { InjectModel } from '@nestjs/mongoose';
import { Review } from './schemas';
import { FilterQuery, Model } from 'mongoose';
import { BookingsService } from 'src/bookings/bookings.service';
import { EBookingStatus } from 'src/bookings/enums';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private readonly reviewModel: Model<Review>,
    private readonly bookingService: BookingsService,
  ) {}

  /**
   * The function creates a review for a service if the user has not already posted a review and if
   * they have a booking for the service.
   * @param {IUser} user - The "user" parameter is an object that represents the user who is creating
   * the review. It should have a property called "_id" which is the unique identifier of the user.
   * @param {CreateReviewDto} createReviewDto - The `createReviewDto` parameter is an object that
   * contains the data needed to create a review. It typically includes properties such as the service
   * ID, rating, comment, and any other relevant information for the review.
   * @returns the result of the `create` method of the `reviewModel`.
   */
  async create(user: IUser, createReviewDto: CreateReviewDto) {
    const prevReview = await this.findOne({ userId: user._id, serviceId: createReviewDto.serviceId });
    if (prevReview) throw new BadRequestException('You have already posted a review');

    const booking = await this.bookingService.findOne({
      userId: user._id,
      serviceId: createReviewDto.serviceId,
      status: EBookingStatus.BOOKED,
    });
    if (!booking) throw new BadRequestException('You cannot review this service');

    return await this.reviewModel.create({ ...createReviewDto, userId: user._id });
  }

  /**
   * The `findAll` function retrieves all reviews that match the given filter.
   * @param filter - The `filter` parameter is a query object that specifies the conditions that the
   * returned documents must meet. It is of type `FilterQuery<Review>`, where `Review` is the type of
   * the documents in the collection. The `filter` object can contain various properties and values to
   * filter the documents
   * @returns a promise that resolves to an array of Review documents that match the provided filter.
   */
  async findAll(filter: FilterQuery<Review>) {
    return await this.reviewModel.find(filter);
  }

  /**
   * The function findOne updates a review document in the database based on the provided filter.
   * @param filter - The filter parameter is an object that specifies the criteria for selecting
   * documents in the database. It is used to filter the documents that will be updated.
   * @returns The `findOne` function is returning a promise that resolves to the result of the
   * `updateOne` method.
   */
  async findOne(filter: FilterQuery<Review>) {
    return await this.reviewModel.updateOne(filter);
  }
}
