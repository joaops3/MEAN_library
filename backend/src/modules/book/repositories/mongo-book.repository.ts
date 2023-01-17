import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Book, BookDocument } from "../book.schema";
import { CreateBookDto } from "../dto/create-book.dto";
import { UpdateBookDto } from "../dto/update-book.dto";
import { BookRepository } from "./book.repository";



@Injectable()
export class MongoBookRepository implements BookRepository {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async findAll(page?: number, limit?: number, title?: string): Promise<Book[]> {
    if (!page && !limit) {
      return await this.bookModel.find();
    }
    let offset = (page - 1) * limit;
    return await this.bookModel.find().skip(offset).limit(limit);
  }
  async findOneById(id: string): Promise<Book> {
    const book = await this.bookModel.findOne({ _id: id });
    return book
  }
  async create(createBook: CreateBookDto): Promise<Book> {
    const book = new this.bookModel(createBook);
    book._id = new mongoose.Types.ObjectId();
    await book.save();
    return book
  }
  async update(currentBook: Book, newBook: UpdateBookDto): Promise<true | null> {
    const updated = await this.bookModel.updateOne({ where: { _id: currentBook._id } }, {...newBook});
    if(!updated){
      return null
    }
    return true
  }
  async delete(id: string): Promise<Book> {
    const deleted = await this.bookModel.findByIdAndDelete(id);
    return deleted
  }
}