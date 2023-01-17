import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { BookController } from "./book.controller";
import { Book, BookSchema } from "./book.schema";
import { BookService } from "./book.service";
import { BookRepository } from "./repositories/book.repository";
import { MongoBookRepository } from "./repositories/mongo-book.repository";

@Module({
  imports: [MongooseModule.forFeature([{name: Book.name, schema: BookSchema }])],
  controllers: [BookController],
  providers: [BookService, {provide: BookRepository, useClass: MongoBookRepository}],
  exports: [BookService]
})
export class BookModule {}
