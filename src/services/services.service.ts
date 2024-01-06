import { Injectable } from '@nestjs/common';
import mongoose, { FilterQuery, Model } from 'mongoose';
import { Merchant } from '../../src/merchants/schemas';
import { Service } from './schemas';
import { ReviewsService } from '../../src/reviews/reviews.service';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service.name) private readonly serviceModel: Model<Service>,
    private readonly reviewsService: ReviewsService,
  ) {}

  /**
   * The function finds all reviews for a given service ID.
   * @param {string} id - The `id` parameter is a string that represents the ID of a service.
   * @returns a promise that resolves to the result of calling the `findAll` method of the
   * `reviewsService` object with a filter object containing the `serviceId` property set to a new
   * `ObjectId` created from the `id` parameter.
   */
  async findServiceReviews(id: string) {
    return await this.reviewsService.findAll({ serviceId: new mongoose.Types.ObjectId(id) });
  }

  /**
   * The function `findAll` retrieves all documents from the `serviceModel` collection that match the
   * given `filterQuery`.
   * @param filterQuery - The `filterQuery` parameter is a query object that specifies the conditions
   * for filtering the services. It is of type `FilterQuery<Service>`, which means it should be an
   * object that matches the structure of the `Service` model. The `Service` model is likely defined
   * somewhere else in the code
   * @returns The `findAll` function is returning a promise that resolves to the result of the `find`
   * method on the `serviceModel` object.
   */
  async findAll(filterQuery: FilterQuery<Service>) {
    return await this.serviceModel.find(filterQuery);
  }

  /**
   * The function findOne retrieves a document from the serviceModel collection based on the provided
   * id.
   * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
   * document you want to find in the database.
   * @returns The findOne method is returning a promise that resolves to the result of the findOne
   * operation on the serviceModel with the specified id.
   */
  async findOne(id: string) {
    return await this.serviceModel.findOne({ _id: id });
  }

  /**
   * The function inserts multiple documents into a database collection and returns the inserted
   * documents as an array of Merchant objects.
   * @param filterQuery - The `filterQuery` parameter is a query object used to filter the documents
   * that will be inserted into the database. It is of type `FilterQuery<Merchant>`, which means it
   * should be a query object that matches the structure of the `Merchant` model.
   * @returns a Promise that resolves to an array of Merchant objects.
   */
  async insertMany(filterQuery: FilterQuery<Merchant>): Promise<Merchant[]> {
    const insertedDocuments = await this.serviceModel.insertMany(filterQuery);
    return insertedDocuments as unknown as Merchant[];
  }
}
