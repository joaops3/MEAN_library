import { Module } from '@nestjs/common';
import { UserModule } from "src/user/user.module";
import { AuthService } from "./auth.service";
import {JwtModule} from "@nestjs/jwt"
import { JwtStrategy } from "./jwt.strategy";
import { AuthController } from './auth.controller';


@Module({
  imports: [UserModule, JwtModule.register({secret: "123"})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
