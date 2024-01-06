import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { MerchantsRepository } from './merchants.repository';
import { MERCHANTS_DATA } from 'data';

@Injectable()
export class MerchantsService implements OnApplicationBootstrap {
  constructor(private readonly merchantsRepository: MerchantsRepository) {}

  async onApplicationBootstrap() {
    await this.seed();
  }

  async seed() {
    const merchantsCount = await this.merchantsRepository.count({});
    if (merchantsCount) return;

    await this.merchantsRepository.insertMany(MERCHANTS_DATA);
  }
}
