import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Document, Model } from 'mongoose';
import { User, UserDocument } from '../user.schema';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from '../userDto/update-user.dto';
import { CreateUserDto } from '../userDto/create-user.dto';
import { Book } from 'src/modules/book/book.schema';

@Injectable()
export class MongoUserRepository implements UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async updateBook(user: User, books: Book[]): Promise<User> {
    const updatedUser = await this.userModel.updateOne(
      { _id: user._id },
      { $set: { book: books } },
    );
    if (updatedUser.modifiedCount === 0) {
      return null;
    }
    return updatedUser as any;
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.userModel
      .findOne({ _id: id })
      .populate('book', 'imageLink');
    return user as any;
  }
  async findAll(): Promise<User[]> {
    return await this.userModel.find().populate('book', 'imageLink');
  }
  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userModel
      .findOne({ email })
      .select({ _id: true, email: true, password: true, role: true });
    return user;
  }
  async delete(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id);
  }
  async update(currentUser: User, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel.updateOne(
      { _id: currentUser._id },
      {
        $set: { ...updateUserDto },
      },
    );
    if (updatedUser.modifiedCount === 0) {
      return null;
    }
    return updatedUser as any;
  }

  async create(user: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(user);
    let salt = await bcrypt.genSalt(12);
    let hash = await bcrypt.hash(createdUser.password, salt);

    createdUser.password = hash;
    createdUser._id = new mongoose.Types.ObjectId();
    await createdUser.save();
    return createdUser;
  }
}
