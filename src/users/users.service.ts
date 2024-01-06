import * as bcrypt from 'bcryptjs';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userModel.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
  }

  async findAll() {
    return await this.userModel.find({});
  }

  async findOne(filterQuery: FilterQuery<User>) {
    return await this.userModel.findOne(filterQuery);
  }

  async updateOne(filterQuery: FilterQuery<User>, update: UpdateQuery<User>) {
    return await this.userModel.updateOne(filterQuery, update);
  }

  async findOneAndUpdate(filterQuery: FilterQuery<User>, update: UpdateQuery<User>): Promise<User> {
    return (await this.userModel.findOneAndUpdate(filterQuery, update)) as unknown as User;
  }

  async verifyUser(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new NotFoundException();
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException();
    delete user.password;
    return user;
  }
}
