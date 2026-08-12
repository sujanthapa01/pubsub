import { Module } from '@nestjs/common';
import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';
import { ScheduleModule } from '@nestjs/schedule';
import {RedisService} from "../redis/redis.service"
import {WriteQuoteService} from "./services/write-quote.service"
import {GuidelineService} from "../guideline/guideline.service"
import {UserRepository} from "../user/repository/user.repository"
import {QuoteRepository} from "./repository/quote.repository"
@Module({
  imports : [ScheduleModule.forRoot()],
  controllers: [QuoteController],
  providers: [QuoteService,RedisService,WriteQuoteService,GuidelineService,UserRepository,QuoteRepository],
})
export class QuoteModule {}
