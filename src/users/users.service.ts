import * as bcrypt from 'bcryptjs';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './schemas';
import { FilterQuery, UpdateQuery } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    return await this.usersRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
  }

  async findAll() {
    return await this.usersRepository.find({});
  }

  async findOne(filterQuery: FilterQuery<User>) {
    return await this.usersRepository.findOne(filterQuery);
  }

  async updateOne(filterQuery: FilterQuery<User>, update: UpdateQuery<User>) {
    return await this.usersRepository.updateOne(filterQuery, update);
  }

  async findOneAndUpdate(filterQuery: FilterQuery<User>, update: UpdateQuery<User>): Promise<User> {
    return (await this.usersRepository.findOneAndUpdate(filterQuery, update)) as unknown as User;
  }

  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    if (!user) throw new NotFoundException();
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException();
    delete user.password;
    return user;
  }
}
