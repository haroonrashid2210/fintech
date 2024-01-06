import { Injectable, Logger } from '@nestjs/common';
import { AbstractDocument } from './abstract.schema';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';

@Injectable()
export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id' | 'createdAt' | 'updatedAt'>): Promise<TDocument> {
    return (await this.model.create(document)).toJSON() as unknown as TDocument;
  }

  async count(filterQuery: FilterQuery<TDocument>): Promise<number> {
    return await this.model.countDocuments(filterQuery);
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    return (await this.model.findOne(filterQuery, {}, { lean: true })) as unknown as TDocument;
  }

  async updateOne(filterQuery: FilterQuery<TDocument>, update: UpdateQuery<TDocument>): Promise<boolean> {
    return !!(await this.model.updateOne(filterQuery, update));
  }

  async findOneAndUpdate(filterQuery: FilterQuery<TDocument>, update: UpdateQuery<TDocument>): Promise<TDocument> {
    return (await this.model.findOneAndUpdate(filterQuery, update, {
      new: true,
      lean: true,
    })) as unknown as TDocument;
  }

  async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    return (await this.model.find(filterQuery, {}, { lean: true })) as unknown as TDocument[];
  }

  async findOneAndDelete(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    return (await this.model.findOneAndDelete(filterQuery, {
      lean: true,
    })) as unknown as TDocument;
  }

  async deleteMany(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    return (await this.model.deleteMany(filterQuery)) as unknown as TDocument[];
  }

  async insertMany(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    const insertedDocuments = await this.model.insertMany(filterQuery);
    return insertedDocuments as unknown as TDocument[];
  }
}
