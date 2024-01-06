import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
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

  findAll() {
    return `This action returns all reviews`;
  }

  async findOne(filter: FilterQuery<Review>) {
    return await this.reviewModel.updateOne(filter);
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
