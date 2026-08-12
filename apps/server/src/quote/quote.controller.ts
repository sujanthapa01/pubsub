import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { QuoteService } from "./quote.service"
import { Cron } from '@nestjs/schedule';
import { JwtGuard } from 'src/auth/guards/jwt-guard/jwt-auth.guard';

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
    async setQuoteOfTheDay() {
        return this.quoteService.setQuoteOfTheDay()
    }

    // @UseGuards(JwtGuard)
    @Post("accept-guideline")
    async setAcceptGuideline(@Body() body: { id: string }) {
        console.log("hii")
        console.log(body.id)
        return this.quoteService.acceptQuoteGuidelines(body.id)
    }



    @Post("write-new-quote")
    async writeNewQuote(){
        
    }
}