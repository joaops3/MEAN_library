import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from "src/user/entities/User.entity";
import { RefreshTokenService } from "src/refresh-token/refresh-token.service";
import * as dayjs from "dayjs"

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private refreshService: RefreshTokenService,
    private jwtService: JwtService,
  ) {}

  async validate(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      return null;
    }
    const validation = await this.userService.comparePassword(password, user.password);
    if (!validation) {
      throw new HttpException('Email ou senha invalidos', 401);
    }
    return user;
  }

  async generateToken(user: UserEntity) {
    await this.refreshService.findByUserId(user._id)
    const refreshToken = await this.refreshService.generateRefreshToken(user)
    const payload = { username: user.email, sub: user._id };
    return { id: user._id, role: user.role,access_token: this.jwtService.sign(payload, { secret: process.env.JWT_SECRET, expiresIn: "1d" }) , refresh_token: refreshToken.refreshToken};
  }


  async generateNewToken(refreshToken: string){
    const ExistentRefreshToken: any = await this.refreshService.find(refreshToken)
    const {createdAt, expiresAt} = ExistentRefreshToken
    const invalidToken = dayjs().isAfter(expiresAt);
    if(invalidToken){
      throw new HttpException("refresh token invalid", 400)
    }
    const newToken = this.jwtService.sign({username: ExistentRefreshToken.userId}, { secret: process.env.JWT_SECRET, expiresIn: "30d" })
    return {acess_token: newToken}

  }
}
