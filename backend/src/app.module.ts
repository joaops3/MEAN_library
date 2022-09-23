import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { BookController } from './book/book.controller';
import { BookService } from './book/book.service';
import { BookModule } from './book/book.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/book_store'), UserModule, BookModule, AuthModule],
  controllers: [],
  providers: [],

})
export class AppModule {}
