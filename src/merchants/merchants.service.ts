import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { MERCHANTS_DATA } from 'data';
import { utils } from '@app/common';
import { Service } from 'src/services/schemas';
import { ServicesService } from 'src/services/services.service';
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

  async findAll() {
    return await this.merchantModel.find({});
  }

  async findById(_id: string) {
    return await this.merchantModel.findOne({ _id });
  }

  async findMerchantServices(_id: string) {
    console.log('_id: ', _id);
    return await this.servicesService.findAll({ merchantId: new mongoose.Types.ObjectId(_id) });
  }
}
