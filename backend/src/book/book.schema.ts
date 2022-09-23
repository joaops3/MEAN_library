import {Schema, Prop, SchemaFactory} from "@nestjs/mongoose"
import { Document } from "mongoose"
import { UserEntity } from "src/user/user.entity"

export type BookDocument = Book & Document

@Schema()
export class Book {

  @Prop()
  _id: string

  @Prop()
  author: string

  @Prop()
  country: string

  @Prop()
  imageLink: string

  @Prop()
  title: string

  @Prop()
  user: UserEntity
}

export const BookSchema = SchemaFactory.createForClass(Book)
