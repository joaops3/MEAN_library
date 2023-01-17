import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './user.schema';
import { BookService } from '../book/book.service';
import { Book, BookSchema } from '../book/book.schema';
import { UserRepository } from './repositories/user.repository';
import { MongoUserRepository } from './repositories/mongo-user.repository';
import { BookModule } from '../book/book.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Book.name, schema: BookSchema },
    ]),
    BookModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    { provide: UserRepository, useClass: MongoUserRepository },
  ],
  exports: [UserService],
})
export class UserModule {}
