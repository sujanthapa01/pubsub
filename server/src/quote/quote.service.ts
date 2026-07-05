import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from "../database/database.service";
import getRandomIndex from "./util/getRandomIndex";
import getDate from "./util/getDate"
import { RedisService } from "../redis/redis.service"
import {Quote } from 'generated/prisma/browser';


@Injectable()
export class QuoteService {
    constructor(private readonly db: DatabaseService, private readonly cache: RedisService) { }


    async generateDailyQuote() {

        try {

            const date = getDate()
            const cacheKey = `daily-quote:${date}`

            const cached = await this.cache.get<Quote>(cacheKey)
            if (cached) {
                return cached
            }


            const tableIndex = await getRandomIndex(this.db)


            const todayQuote = await this.db.quote.findFirst({
                skip: tableIndex
            })

            if (!todayQuote) {
                throw new NotFoundException("no quote found")
            }

            const today = getDate()

            const quote = await this.db.dailyQuote.upsert({
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

            this.cache.set(cacheKey, quote, 60 * 60 * 24)
            return quote

        } catch (error: any) {
            throw new InternalServerErrorException(error.message)
        }

    }



    async getTodayQuote() {
        try {

            const today = getDate()
            const cacheKey = `daily-quote:${today}`
            console.log(today)

            const cached = await this.cache.get<Quote>(cacheKey)

            if (cached) {
                console.log("from cache",cached)
                return cached
            }

            // const all = await this.db.dailyQuote.findMany()
            // console.log(all)
            const quote = await this.db.dailyQuote.findUnique({
                where: {
                    date: today
                },
                include: {
                    quote: true
                }
            })

            await this.cache.set(cacheKey, quote?.quote, 60 * 60 * 24)

            if (!quote) {
                return "no quote found in dailyQuoteTable"
            }
            console.log(quote.quote)
            return quote.quote

        } catch (error: any) {
            throw new InternalServerErrorException(error.message)
        }
    }



    async setQuoteOfTheDay() {
        try {

            const date = getDate()
            const cacheKey = `daily-quote:${date}`


            const cached = await this.cache.get<Quote>(cacheKey)
            if (cached) {
                return cached
            }

            const randomTableIndex = await getRandomIndex(this.db)

            const quote = await this.db.quote.findFirst({
                skip: randomTableIndex
            })

            if (!quote) {
                throw new Error("no quote found!")
            }


            const result = await this.db.dailyQuote.create({
                data: {
                    quoteId: quote?.id,
                    date: date
                },include : {
                    quote : true
                }
            })

            await this.cache.set(cacheKey, result.quote, 60 * 60 * 24)

            return {
                message: "sucess",
                quote: result.quote,
                date: date
            }

        } catch (error: any) {
            throw new InternalServerErrorException(error.message)
        }
    }
}
