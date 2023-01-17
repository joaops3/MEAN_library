import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './book.schema';
import mongoose, { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { v4 } from 'uuid';
import { BuyBookDto } from './dto/buy-book.dto';
import { ObjectId } from 'mongoose';
import { BookRepository } from './repositories/book.repository';

@Injectable()
export class BookService {
  constructor(private bookRepository: BookRepository) {}

  async create(createBookDto: CreateBookDto) {
    if (!createBookDto.title) {
      throw new HttpException('missing title', 400);
    }
    if (!createBookDto.author) {
      throw new HttpException('missing author', 400);
    }
    if (!createBookDto.imageLink) {
      throw new HttpException('missing image link', 400);
    }
    const book = await this.bookRepository.create(createBookDto);
    if (!book) {
      throw new HttpException('bad Request', 400);
    }
    return book;
  }

  async findAll({
    page,
    limit,
    title,
  }: {
    page?: number;
    limit?: number;
    title?: string;
  }) {
    const books = await this.bookRepository.findAll(page, limit, title);
    return books;
  }

  async findOne(id: string) {
    const book = await this.bookRepository.findOneById(id);
    if (!book) {
      throw new HttpException('Book not found', 404);
    }
    return book;
  }

  async update(
    id: string,
    updateBookDto: UpdateBookDto,
  ): Promise<{ message: string }> {
    if (!updateBookDto) {
      throw new HttpException('No data send', 400);
    }
    let book = await this.bookRepository.findOneById(id);
    if (!book) {
      throw new HttpException('book not found', 404);
    }
    let updated = await this.bookRepository.update(book, updateBookDto);
    if (!updated) {
      throw new HttpException('erro update', 404);
    }
    return { message: 'updated' };
  }

  async delete(id: string) {
    if (!id) {
      throw new HttpException('id is required', 400);
    }
    const book = this.bookRepository.delete(id);
    return {message: "deleted"}
  }

  async findToBuy(books: BuyBookDto[]): Promise<Book[]> {
    let booksList = [];
    books.forEach(async (book: BuyBookDto) => {
      let foundBook = await this.bookRepository.findOneById(book._id);
      if (foundBook) {
        booksList.push(foundBook);
      }
    });
    return booksList;
  }
}
