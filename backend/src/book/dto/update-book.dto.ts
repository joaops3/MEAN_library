import { PartialType } from '@nestjs/swagger';
import { UserEntity } from "src/user/user.entity";
import { CreateBookDto } from "./create-book.dto";

export class UpdateBookDto extends PartialType(CreateBookDto) {
  author?: string;

  imageLink?: string;

  title?: string;

  user: UserEntity
}