import { Module } from '@nestjs/common';
import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';
import { ScheduleModule } from '@nestjs/schedule';


@Module({
  imports : [ScheduleModule.forRoot()],
  controllers: [QuoteController],
  providers: [QuoteService]
})
export class QuoteModule {}
