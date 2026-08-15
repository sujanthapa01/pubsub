import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { QuoteService } from "./quote.service"
import { Cron } from '@nestjs/schedule';
import { JwtGuard } from 'src/auth/guards/jwt-guard/jwt-auth.guard';
import { WriteQuoteService } from "./services/write-quote.service"
import { CurrentUser } from "../common/decorators/current-user.decorator"
import type { CurrentUserPayload } from "../common/decorators/current-user.decorator"
import { CreateQuoteDto } from "./dto/create-quote.dto"

@Controller('quote')
export class QuoteController {


    constructor(private quoteService: QuoteService, private writeQuoteService: WriteQuoteService) { }



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

    @UseGuards(JwtGuard)
    @Post("write-new-quote")
    async writeNewQuote(
        @CurrentUser() user: CurrentUserPayload,
        @Body() body: CreateQuoteDto,
    ) {
        console.log(user.id)
        return this.writeQuoteService.createQuote(user.id, body);
    }


    @UseGuards(JwtGuard)
    @Get("profile")
    profile(@CurrentUser() user: CurrentUserPayload){
        console.log("user from cookie",user.id, user.email)
    }
}