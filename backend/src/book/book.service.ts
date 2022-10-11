import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Book } from "./book.schema";
import { Model } from "mongoose";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import {v4} from "uuid"

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async create(createBookDto: CreateBookDto) {
    if (!createBookDto.title) {
      throw new HttpException('missing title', 422);
    }
    if (!createBookDto.author) {
      throw new HttpException('missing author', 422);
    }
    if (!createBookDto.imageLink) {
      throw new HttpException('missing image link', 422);
    }
    const book = new this.bookModel(createBookDto);
    book._id = v4()
    await book.save()
    return book;
  }

  async findAll(name: string) {
    if(!name){
      return await this.bookModel.find();
    }
    return await this.bookModel.find({title: name})
  }

  async findOne(id: string) {
    return await this.bookModel.findById(id);
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    if (!updateBookDto) {
      throw new HttpException('no data send', 422);
    }
    let book = await this.bookModel.findById(id);
    if (!book) {
      return;
    }
    return  ;
  }

  async delete(id: string) {
    return this.bookModel.findByIdAndDelete(id);
  }
}
