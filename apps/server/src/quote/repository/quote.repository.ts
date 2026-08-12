import { Injectable, NotFoundException } from "@nestjs/common"
import { DatabaseService } from "../../database/database.service"
import { CreateQuoteData, IQuoteRepository } from "../repository/types/quote-repository.types"
import { Quote } from "generated/prisma/browser"

@Injectable()
export class QuoteRepository implements IQuoteRepository {
    constructor(private readonly db: DatabaseService) { }

    async create(data: CreateQuoteData): Promise<Quote> {
        return this.db.quote.create({ data })
    }


    async findById(id: string): Promise<Quote> {
        const quote = await this.db.quote.findUnique({ where: { id } })

        if (!quote) { throw new NotFoundException(`Quote id:${id} not found in database`) }

        return quote
    }

}