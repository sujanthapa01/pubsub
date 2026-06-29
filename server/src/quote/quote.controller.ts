import { Controller, Get, Post } from '@nestjs/common';
import { QuoteService } from "./quote.service"
import { Cron } from '@nestjs/schedule';

@Controller('quote')
export class QuoteController {


    constructor(private quoteService: QuoteService) { }



    @Cron('0 5 * * *', { timeZone: "Asia/Kolkata" })
    async updateDailyQuote() {
        await this.quoteService.generateDailyQuote()
    }


    @Get("today")
    async getRandomQuote() {
        console.log("hii")
        // return "hii"
        return this.quoteService.getTodayQuote()
    }

    @Post("set")
    async setQuoteOfTheDay(){
        return this.quoteService.setQuoteOfTheDay()
    }

}