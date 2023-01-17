import { Book } from "../book.schema";
import { CreateBookDto } from "../dto/create-book.dto";
import { UpdateBookDto } from "../dto/update-book.dto";


export abstract class BookRepository {
  abstract findAll(page?: number, limit?: number, title?: string): Promise<Book[]>;
  abstract findOneById(id: string): Promise<Book | null>;
  abstract create(book: CreateBookDto): Promise<Book>;
  abstract update(currentBook: Book, newBook: UpdateBookDto): Promise<true | null>;
  abstract delete(id: string): Promise<Book | null>;
}