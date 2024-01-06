import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Merchant } from './schemas';

@Injectable()
export class MerchantsRepository extends AbstractRepository<Merchant> {
  protected readonly logger = new Logger(MerchantsRepository.name);
  constructor(
    @InjectModel(Merchant.name)
    userModel: Model<Merchant>,
  ) {
    super(userModel);
  }
}
