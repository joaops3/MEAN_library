import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel} from "@nestjs/mongoose";
import mongoose, {Model} from "mongoose"
import { RefreshToken, RefreshTokenDocument } from "./refresh-token.schema";
import { JwtService } from "@nestjs/jwt";
import { v4 } from "uuid";
import { UserEntity } from "src/modules/user/entities/User.entity";
import * as dayjs from "dayjs"
@Injectable()
export class RefreshTokenService {

  constructor(@InjectModel(RefreshToken.name) private refreshTokenModel: Model<RefreshTokenDocument>, private jwtService:JwtService ){}

  async find(id: string){
    if (!id) {
      throw new HttpException('Bad request', 400);
    }
    const refresh = await this.refreshTokenModel.find({ refreshToken: id });
    if(!refresh){
      throw new HttpException("refresh token invalid", 404)
    }
    return refresh
  }

  async findByUserId(id: string){
     if (!id) {
       throw new HttpException('Bad request', 400);
     }
     const refresh = await this.refreshTokenModel.find({ userId: id });
     if (!refresh) {
       throw new HttpException('refresh token invalid', 404);
     }
     return refresh;
  }

  async generateRefreshToken(user: UserEntity){
    if(!user){
      throw new HttpException("Bad request", 400)
    }
    const refreshToken = new this.refreshTokenModel()
    refreshToken._id = new mongoose.Types.ObjectId();
    refreshToken.userId = user._id
    const payload = {username: user.email, sub: user._id}
    const generatedRefresh = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_SECRET, expiresIn: "6m"
    });
    refreshToken.refreshToken = generatedRefresh
    refreshToken.expiredAt = dayjs().add(30, "day").format()
    await refreshToken.save()
    return refreshToken
  }

  async deleteRefreshToken(userId: string){
    if(!userId){
      throw new HttpException("bad request", 400)
    }
    return await this.refreshTokenModel.deleteMany({userId})

  }

}
