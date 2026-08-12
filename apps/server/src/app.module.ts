import { Module } from '@nestjs/common';
import { AuthModule } from "./auth/auth.module"
import { ConfigModule } from "@nestjs/config"
import {DatabaseModule} from "./database/database.module"
import { QuoteModule } from './quote/quote.module';
import {RedisModule} from "./redis/redis.module";
import {UserModule} from "./user/user.module"
import {GuidelineModule} from "./guideline/guideline.module"

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), AuthModule, DatabaseModule, QuoteModule,RedisModule,UserModule,GuidelineModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
