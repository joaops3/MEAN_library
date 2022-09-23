import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport/dist";
import { ExtractJwt, Strategy } from "passport-jwt";


export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(){
    super({ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), ignoreExpiration: true, secretOrKey: "123" });
  }

  async validate(payload: any){
    return {_id: payload.sub, username: payload.username };
  }
}