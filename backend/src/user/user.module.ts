import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './user.schema';
import { BookService } from "../book/book.service";
import { Book, BookSchema } from "../book/book.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, {name: Book.name, schema: BookSchema}])
  ],
  controllers: [UserController],
  providers: [UserService, BookService],
  exports: [UserService],
})
export class UserModule {}
