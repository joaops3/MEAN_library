import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Book, BookDocument } from "./book.schema";
import mongoose, { Model } from "mongoose";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import {v4} from "uuid"
import { BuyBookDto } from "./dto/buy-book.dto";

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

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
    book._id = new mongoose.Types.ObjectId()
    await book.save()
    return book;
  }

  async findAll(name: string) {
    if(!name){
      return await this.bookModel.find().populate("book");
    }
    return await this.bookModel.find({title: name}).populate("book")
  }

  async findOne(id: string) {
    return await this.bookModel.findById(id).populate("book").exec();
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
    if(!id){
      throw new HttpException('id is required', 400);
    }
    return this.bookModel.findByIdAndDelete(id);
  }

  async findToBuy(books: BuyBookDto[]): Promise<Book[]>{
     let  booksList = []
      books.forEach(async (book: BuyBookDto) => {
      let foundBook = await this.bookModel.findById(book._id)
      if(foundBook){
        booksList.push(foundBook)
      }
    })
    return booksList
  }
}
