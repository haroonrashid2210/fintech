import { Injectable } from '@nestjs/common';
import mongoose, { FilterQuery } from 'mongoose';
import { Merchant } from 'src/merchants/schemas';
import { ServicesRepository } from './services.repository';
import { Service } from './schemas';
import { ReviewsService } from 'src/reviews/reviews.service';

@Injectable()
export class ServicesService {
  constructor(
    private readonly servicesRepository: ServicesRepository,
    private readonly reviewsService: ReviewsService,
  ) {}

  async findServiceReviews(id: string) {
    return await this.reviewsService.findAll({ serviceId: new mongoose.Types.ObjectId(id) });
  }

  async findAll(filterQuery: FilterQuery<Service>) {
    return await this.servicesRepository.find(filterQuery);
  }

  async findOne(id: string) {
    return await this.servicesRepository.findOne({ _id: id });
  }

  async insertMany(filterQuery: FilterQuery<Merchant>): Promise<Merchant[]> {
    const insertedDocuments = await this.servicesRepository.insertMany(filterQuery);
    return insertedDocuments as unknown as Merchant[];
  }
}
