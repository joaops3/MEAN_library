import { Book } from "src/modules/book/book.schema"
import { Role } from '../../../types';

export class UserEntity {
  _id: string
  email: string
  password?: string
  Book?: Book[]
  role: Role[]
}