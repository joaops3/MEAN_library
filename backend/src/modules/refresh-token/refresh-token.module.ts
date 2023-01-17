import { Module } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshToken, RefreshTokenSchema } from './refresh-token.schema';
import { RefreshTokenService } from "./refresh-token.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RefreshToken.name, schema: RefreshTokenSchema },
    ]),
  ],
  providers: [RefreshTokenService, JwtService],
  exports: [RefreshTokenService]
})
export class RefreshTokenModule {}
