import { Module } from "@nestjs/common";
import { BookModule } from "src/modules/book/book.module";
import { RefreshTokenModule } from "src/modules/refresh-token/refresh-token.module";

import { UserModule } from "src/modules/user/user.module";
import { AuthModule } from "src/modules/auth/auth.module";
import { DbModule } from "./db.module";
import { ConfigModule } from "@nestjs/config";


@Module({
  imports: [UserModule, BookModule, RefreshTokenModule, AuthModule, DbModule],
  providers: [],
})
export class HttpModule {}
