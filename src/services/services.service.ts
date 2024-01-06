import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { FilterQuery } from 'mongoose';
import { Merchant } from 'src/merchants/schemas';
import { ServicesRepository } from './services.repository';
import { Service } from './schemas';

@Injectable()
export class ServicesService {
  constructor(private readonly servicesRepository: ServicesRepository) {}
  create(createServiceDto: CreateServiceDto) {
    return 'This action adds a new service';
  }

  async findAll(filterQuery: FilterQuery<Service>) {
    return await this.servicesRepository.find(filterQuery);
  }

  async findOne(id: string) {
    return await this.servicesRepository.findOne({ _id: id });
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }

  async insertMany(filterQuery: FilterQuery<Merchant>): Promise<Merchant[]> {
    const insertedDocuments = await this.servicesRepository.insertMany(filterQuery);
    return insertedDocuments as unknown as Merchant[];
  }
}
