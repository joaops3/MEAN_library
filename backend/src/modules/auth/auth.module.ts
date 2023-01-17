import { Module } from '@nestjs/common';
import { UserModule } from '../../modules/user/user.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { RefreshTokenService } from 'src/modules/refresh-token/refresh-token.service';
import { RefreshTokenModule } from 'src/modules/refresh-token/refresh-token.module';

@Module({
  imports: [
    UserModule,
    RefreshTokenModule,
    JwtModule.register({ secret: process.env.JWT_SECRET }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
