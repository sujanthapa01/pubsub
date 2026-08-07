import { Module } from '@nestjs/common';
import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';
import { ScheduleModule } from '@nestjs/schedule';
import {RedisService} from "../redis/redis.service"
import {WriteQuoteService} from "./services/write-quote.service"
@Module({
  imports : [ScheduleModule.forRoot()],
  controllers: [QuoteController],
  providers: [QuoteService,RedisService,WriteQuoteService]
})
export class QuoteModule {}
