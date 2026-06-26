import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from "../database/database.service";
@Injectable()
export class QuoteService {
    constructor(private readonly db: DatabaseService) { }


    async generateDailyQuote() {

        try {
            const count = await this.db.quote.count()
            const tableIndex = Math.floor(Math.random() * count)

            const todayQuote = await this.db.quote.findFirst({
                skip: tableIndex
            })

            if (!todayQuote) {
                throw new NotFoundException("no quote found")
            }

            const today = new Date().toDateString().split("T")[0]

            return await this.db.dailyQuote.upsert({
                where: {
                    date: today
                },
                update: {
                    quoteId: todayQuote.id
                },
                create: {
                    quoteId: todayQuote.id,
                    date: today
                }
            })

        } catch (error: any) {
            throw new InternalServerErrorException(error.message)
        }

    }



    async getTodayQuote() {
        try {

            const today = new Date().toISOString().split("T")[0]
            console.log(today)

            const all = await this.db.dailyQuote.findMany()
            console.log(all)
            const quote = await this.db.dailyQuote.findUnique({
                where: {
                    date: today
                },
                include: {
                    quote: true
                }
            })

            if(!quote){
                return "no quote found in dailyQuoteTable"
            }

            return quote

        } catch (error: any) {
            throw new InternalServerErrorException(error.message)
        }
    }
}
