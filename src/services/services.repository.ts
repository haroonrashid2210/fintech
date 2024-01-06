import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service } from './schemas';

@Injectable()
export class ServicesRepository extends AbstractRepository<Service> {
  protected readonly logger = new Logger(ServicesRepository.name);
  constructor(
    @InjectModel(Service.name)
    userModel: Model<Service>,
  ) {
    super(userModel);
  }
}
