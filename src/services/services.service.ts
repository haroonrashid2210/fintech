import { Injectable } from '@nestjs/common';
import mongoose, { FilterQuery, Model } from 'mongoose';
import { Merchant } from 'src/merchants/schemas';
import { Service } from './schemas';
import { ReviewsService } from 'src/reviews/reviews.service';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service.name) private readonly serviceModel: Model<Service>,
    private readonly reviewsService: ReviewsService,
  ) {}

  async findServiceReviews(id: string) {
    return await this.reviewsService.findAll({ serviceId: new mongoose.Types.ObjectId(id) });
  }

  async findAll(filterQuery: FilterQuery<Service>) {
    return await this.serviceModel.find(filterQuery);
  }

  async findOne(id: string) {
    return await this.serviceModel.findOne({ _id: id });
  }

  async insertMany(filterQuery: FilterQuery<Merchant>): Promise<Merchant[]> {
    const insertedDocuments = await this.serviceModel.insertMany(filterQuery);
    return insertedDocuments as unknown as Merchant[];
  }
}
