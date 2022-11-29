import { Book } from "src/book/book.schema"
import { Role } from "../user.schema"

export class UserEntity {
  _id: string
  email: string
  password?: string
  Book?: Book[]
  role: Role[]
}