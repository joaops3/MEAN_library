import { UserEntity } from "../entities/User.entity";
import { CreateUserDto } from "../userDto/create-user.dto";
import { UpdateUserDto } from "../userDto/update-user.dto";
import { User } from "../user.schema";
import { Book } from "src/modules/book/book.schema";

export abstract class UserRepository {
  abstract findOneById(id: string): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract findOneByEmail(email: string): Promise<User>;
  abstract create(user: CreateUserDto): Promise<User>;
  abstract delete(id: string): Promise<User>;
  abstract update(user: User, data: UpdateUserDto): Promise<User>;

  abstract updateBook(user: User, books: Book[] ): Promise<User>
}