import * as bcrypt from 'bcryptjs';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  /**
   * The create function takes a CreateUserDto object, hashes the password using bcrypt, and creates a
   * new user in the database.
   * @param {CreateUserDto} createUserDto - The `createUserDto` parameter is an object that contains the
   * data needed to create a new user. It typically includes properties such as `username`, `email`, and
   * `password`.
   * @returns The `create` method is returning a Promise that resolves to the created user object.
   */
  async create(createUserDto: CreateUserDto) {
    return await this.userModel.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
  }

  /**
   * The `findAll` function retrieves all documents from the `userModel` collection.
   * @returns The `findAll` function is returning a promise that resolves to an array of all the
   * documents found in the `userModel` collection.
   */
  async findAll() {
    return await this.userModel.find({});
  }

  /**
   * The function findOne takes a filter query and returns a promise that resolves to the first user
   * that matches the query.
   * @param filterQuery - The `filterQuery` parameter is a query object used to filter the documents in
   * the `User` collection. It is of type `FilterQuery<User>`, which means it should be an object that
   * matches the structure of the `User` model. The `findOne` method will use this query object
   * @returns The `findOne` method is returning a promise that resolves to the result of the `findOne`
   * operation on the `userModel` with the provided `filterQuery`.
   */
  async findOne(filterQuery: FilterQuery<User>) {
    return await this.userModel.findOne(filterQuery);
  }

  /**
   * The function updates a single document in the user collection based on the provided filter query
   * and update.
   * @param filterQuery - The filterQuery parameter is an object that specifies the criteria for
   * selecting documents to update. It is used to filter the documents in the collection based on
   * certain conditions.
   * @param update - The `update` parameter is an object that specifies the changes to be made to the
   * document(s) that match the `filterQuery`. It can include various update operators such as ``,
   * ``, ``, etc.
   * @returns the result of the `updateOne` method call on the `userModel`.
   */
  async updateOne(filterQuery: FilterQuery<User>, update: UpdateQuery<User>) {
    return await this.userModel.updateOne(filterQuery, update);
  }

  /**
   * The function findOneAndUpdate takes a filter query and an update query, and returns a promise that
   * resolves to a User object.
   * @param filterQuery - The filterQuery parameter is an object that specifies the criteria for
   * selecting documents in the database. It is used to filter the documents that will be updated.
   * @param update - The `update` parameter is an object that specifies the changes to be made to the
   * document that matches the `filterQuery`. It can include various update operators such as ``,
   * ``, ``, etc. The `update` object should be of type `UpdateQuery<User>`, where
   * @returns a Promise that resolves to a User object.
   */
  async findOneAndUpdate(filterQuery: FilterQuery<User>, update: UpdateQuery<User>): Promise<User> {
    return (await this.userModel.findOneAndUpdate(filterQuery, update)) as unknown as User;
  }

  /**
   * The function verifies a user's email and password, throwing exceptions if the user is not found or
   * the password is invalid, and returns the user object without the password.
   * @param {string} email - A string representing the email of the user to be verified.
   * @param {string} password - The password parameter is a string that represents the user's password.
   * @returns The user object is being returned.
   */
  async verifyUser(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new NotFoundException();
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException();
    delete user.password;
    return user;
  }
}
