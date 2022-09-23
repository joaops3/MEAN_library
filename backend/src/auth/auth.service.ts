import { Injectable } from '@nestjs/common';
import { UserService } from "src/user/user.service";
import {JwtService} from "@nestjs/jwt"

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService){}

  async validate(email: string): Promise<any>{
    const user = this.userService.findOneByEmail(email)
    if(!user){
      return null
    }
    return user
  }

  async generateToken(user: any){
    const payload = {username: user.email, sub: user._id}
    return {access_token: this.jwtService.sign(payload, {secret: "123"})}

  }
}
