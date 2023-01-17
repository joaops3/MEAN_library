import { Injectable, HttpException } from '@nestjs/common';
import { User } from './user.schema';
import { CreateUserDto } from './userDto/create-user.dto';
import { UpdateUserDto } from './userDto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Book } from '../book/book.schema';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (!createUserDto.email) {
      throw new HttpException('nome obrigatorio', 400);
    }
    if (!createUserDto.email) {
      throw new HttpException('password obrigatorio', 400);
    }

    const createdUser = await this.userRepository.create(createUserDto);

    return createdUser;
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneById(id);
    if (!user) {
      throw new HttpException('user not found', 404);
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = this.userRepository.findOneByEmail(email);
    if (!user) {
      throw new HttpException('error user not found', 404);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (!updateUserDto.email) {
      throw new HttpException('name required', 400);
    }
    const user = await this.userRepository.findOneById(id);
    if (!user) {
      throw new HttpException('user not found', 404);
    }
    const updated = await this.userRepository.update(user, updateUserDto);
    if (!updated) {
      throw new HttpException('update erro', 422);
    }
    return updated;
  }

  async delete(id: string) {
    const user = await this.userRepository.delete(id);
    if (!user) {
      throw new HttpException('bad request', 400);
    }
    return { message: 'deleted' };
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
    const user = await this.userRepository.findOneById(_id);
    return { books: user.book };
  }

  async addBook(id: string, books: Book[]) {
    const user = await this.userRepository.findOneById(id);
    if (!user) {
      throw new HttpException('user not found', 404);
    }
    if (!user.book) {
      user.book = [];
    }
    user.book = [...user.book, ...books];
    const updated = await this.userRepository.updateBook(user, user.book);
    if (!updated) {
      throw new HttpException('erro update', 422);
    }
    return { message: 'success' };
  }

  async removeBook(id: string, bookId: string) {
    const user = await this.userRepository.findOneById(id);
    if (!user.book) {
      throw new HttpException('book not found', 404);
    }
    user.book = user.book.filter((book) => {
      if (book._id != bookId) return book;
    });
    await this.userRepository.updateBook(user, user.book);
    return { message: 'deleted' };
  }
}
