import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './userDto/create-user.dto';
import { UpdateUserDto } from './userDto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { Book } from '../book/book.schema';
import mongoose from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (!createUserDto.email) {
      throw new HttpException('nome obrigatorio', 422);
    }
    if (!createUserDto.email) {
      throw new HttpException('password obrigatorio', 422);
    }

    const createdUser = new this.userModel(createUserDto);
    let salt = await bcrypt.genSalt(12);
    let hash = await bcrypt.hash(createdUser.password, salt);

    createdUser.password = hash;
    createdUser._id = new mongoose.Types.ObjectId();
    await createdUser.save();
    return createdUser;
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    return await this.userModel.find({ _id: id }).populate('book', 'title');
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('error user not found', 404);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (!updateUserDto.email) {
      throw new HttpException('name required', 422);
    }
    let user = await this.userModel.findById(id);
    if (!user) {
      return;
    }
    user.email = updateUserDto.email;
    await user.save();
    return user;
  }

  async delete(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  async comparePassword(password: string, userPassword: string) {
    try {
      const validation = await bcrypt.compare(password, userPassword);
      return validation;
    } catch (e) {
      console.log(e);
    }
  }

  async getBooks(_id: string) {
    const user = await this.userModel.findById(_id);
    return { books: user.book };
  }

  async addBook(id: string, books: Book[]) {
    const user = await this.userModel.findById(id);
    if (!user.book) {
      user.book = [];
    }
    user.book = [...user.book, ...books];
    await user.save();
    return { message: 'sucess' };
  }

  async removeBook(id: string, bookId: string) {
    const user = await this.userModel.findById(id);
    if(!user.book){
      throw new HttpException( "book not found", 404)
    }
    user.book = user.book.filter((book) => {
      if (book._id != bookId) return book;
    });
    user.save()
    return {message: "deleted"}
  }
}
