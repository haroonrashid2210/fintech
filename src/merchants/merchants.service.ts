import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { MERCHANTS_DATA } from '../../data';
import { utils } from '@app/common';
import { Service } from '../../src/services/schemas';
import { ServicesService } from '../../src/services/services.service';
import mongoose, { Model } from 'mongoose';
import { Merchant } from './schemas';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MerchantsService implements OnApplicationBootstrap {
  constructor(
    @InjectModel(Merchant.name) private readonly merchantModel: Model<Merchant>,
    private readonly servicesService: ServicesService,
  ) {}

  async onApplicationBootstrap() {
    await this.seed();
  }

  /**
   * The `seed` function inserts merchants and their services into the database if there are no
   * existing merchants.
   * @returns The function `seed()` returns nothing (`undefined`) if there are already existing
   * merchants in the database (`merchantsCount` is truthy). If there are no existing merchants, the
   * function inserts new merchants (`MERCHANTS_DATA`) into the database and then inserts services for
   * each merchant. The function does not have an explicit return statement, so it implicitly returns a
   * promise that resolves when all the database operations
   */
  async seed() {
    const merchantsCount = await this.merchantModel.countDocuments({});
    if (merchantsCount) return;

    const insertedMerchants = await this.merchantModel.insertMany(MERCHANTS_DATA);

    for (let i = 0; i < insertedMerchants.length; i++) {
      const services: Omit<Service, '_id' | 'createdAt' | 'updatedAt'>[] = [];

      for (let j = 1; j < 4; j++) {
        services.push({
          merchantId: insertedMerchants[i]._id,
          name: `Service ${j}`,
          price: utils.generateRandomNumber(100, 1000),
        });
      }

      await this.servicesService.insertMany(services);
    }
  }

  /**
   * The `findAll` function retrieves all documents from the `merchantModel` collection.
   * @returns The `findAll` function is returning a promise that resolves to an array of all documents
   * found in the `merchantModel` collection.
   */
  async findAll() {
    return await this.merchantModel.find({});
  }

  /**
   * The function finds a merchant by their ID.
   * @param {string} _id - The _id parameter is a string that represents the unique identifier of the
   * document you want to find in the database.
   * @returns The `findById` function is returning a promise that resolves to the result of the
   * `findOne` method call on the `merchantModel` with the specified `_id` as the search criteria.
   */
  async findById(_id: string) {
    return await this.merchantModel.findOne({ _id });
  }

  /**
   * The function `findMerchantServices` returns all services associated with a given merchant ID.
   * @param {string} _id - The _id parameter is a string that represents the unique identifier of a
   * merchant.
   * @returns the result of calling the `findAll` method of the `servicesService` with a query
   * parameter of `{ merchantId: new mongoose.Types.ObjectId(_id) }`. The `findAll` method is likely
   * returning a promise that resolves to an array of merchant services.
   */
  async findMerchantServices(_id: string) {
    return await this.servicesService.findAll({ merchantId: new mongoose.Types.ObjectId(_id) });
  }
}
