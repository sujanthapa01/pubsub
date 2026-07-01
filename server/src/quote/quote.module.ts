import { Module } from '@nestjs/common';
import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';
import { ScheduleModule } from '@nestjs/schedule';
import {RedisService} from "../redis/redis.service"

@Module({
  imports : [ScheduleModule.forRoot()],
  controllers: [QuoteController],
  providers: [QuoteService,RedisService]
})
export class QuoteModule {}
