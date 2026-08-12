import { Quote } from "../../../../generated/prisma/browser"
import {QuoteStatus} from "../../../../generated/prisma/browser"
// src/quote/repositories/quote.repository.ts
export type CreateQuoteData = {
    quote: string;
    author: string;
    userId: string;
    status: QuoteStatus;
}


export interface IQuoteRepository {
    create(data: CreateQuoteData): Promise<Quote>
    findById(id:string): Promise<Quote | string>
}