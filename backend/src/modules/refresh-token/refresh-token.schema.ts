import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose"
import mongoose, {Document} from "mongoose"

export type RefreshTokenDocument = RefreshToken & Document

@Schema()
export class RefreshToken {

  @Prop({required: true})
  _id: string

  @Prop({required: true,})
  userId: string

  @Prop()
  refreshToken: string

  @Prop({default: Date.now()})
  createdAt: Date

  @Prop()
  expiredAt: string

}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken)