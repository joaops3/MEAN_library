import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
    }), MongooseModule.forRoot(process.env.DB_URL)],
  providers: [],
})
export class DbModule {}