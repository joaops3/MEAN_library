import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { BookModule } from './modules/book/book.module';
import { AuthModule } from './modules/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

import { RefreshTokenService } from './modules/refresh-token/refresh-token.service';
import { RefreshTokenModule } from './modules/refresh-token/refresh-token.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URL),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'uploads') }),
    UserModule,
    BookModule,
    AuthModule,
    MulterModule.register({ dest: './uploads' }),
    RefreshTokenModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
