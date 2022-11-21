import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Book, BookDocument } from "./book.schema";
import mongoose, { Model } from "mongoose";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import {v4} from "uuid"
import { BuyBookDto } from "./dto/buy-book.dto";
import { ObjectId } from "mongoose";

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

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
    const book = new this.bookModel(createBookDto);
    book._id = new mongoose.Types.ObjectId();
    await book.save();
    return book;
  }

  async findAll({page, limit, title}: {page?: number, limit?: number, title?: string}) {
    if (!page && !limit) {
      return await this.bookModel.find();
    }
    let offset = (page - 1) * limit;
    return await this.bookModel.find().skip(offset).limit(limit);
  }

  async findOne(id: string) {
    const book = await this.bookModel.findOne({ _id: id });
    if (!book) {
      throw new HttpException('Book not found', 404);
    }
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    if (!updateBookDto) {
      throw new HttpException('No data send', 400);
    }
    let book = await this.bookModel.findOne({ where: { _id: id } });
    if (!book) {
      return;
    }
    await this.bookModel.updateOne({ where: { _id: id } }, updateBookDto);
    return;
  }

  async delete(id: string) {
    if (!id) {
      throw new HttpException('id is required', 400);
    }
    return this.bookModel.findByIdAndDelete(id);
  }

  async findToBuy(books: BuyBookDto[]): Promise<Book[]> {
    let booksList = [];
    books.forEach(async (book: BuyBookDto) => {
      let foundBook = await this.bookModel.findById(book._id);
      if (foundBook) {
        booksList.push(foundBook);
      }
    });
    return booksList;
  }
}
