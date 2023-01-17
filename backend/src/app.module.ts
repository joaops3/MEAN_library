import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

import { HttpModule } from "./infra/http.module";
import { DbModule } from "./infra/db.module";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'uploads') }),
    MulterModule.register({ dest: './uploads' }),
    HttpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
