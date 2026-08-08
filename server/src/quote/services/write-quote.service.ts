import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common"
import { QuoteRepository } from "../repository/quote.repository"
import { CreateQuoteDto } from "../dto/create-quote.dto"
import { UserRepository } from "../../user/repository/user.repository"
import { GuidelineService } from "../../guideline/guideline.service"
import { QuoteStatus } from "generated/prisma/enums"
import { User } from "generated/prisma/browser"
@Injectable()
export class WriteQuoteService {
    constructor(private quoteRepo: QuoteRepository, private userRepo: UserRepository, private readonly guidelineService: GuidelineService) { }

    async createQuote(userId: string, dto: CreateQuoteDto) {

        const user = await this.getUserOrThrow(userId)

        this.assertHasAcceptedCurrentGuidelines(user)

        return this.quoteRepo.create({
            quote: dto.quote,
            author: dto.author,
            userId: userId,
            status: QuoteStatus.PENDING
        })

    }

    async getUserOrThrow(userId: string) {
        const user = await this.userRepo.findById(userId)

        if (!user) {
            throw new NotFoundException('user not found')
        }

        return user
    }

    async assertHasAcceptedCurrentGuidelines(user: User) {
        const currentGuidelineVersion = this.guidelineService.getCurrentVersion()
        const hasAcceptedCurrentGuidelines = user.hasAcceptedQuoteGuidelines && user.quoteGuidelinesVersion === currentGuidelineVersion

        if (!hasAcceptedCurrentGuidelines) {
            throw new ForbiddenException('Must accept current quote guidelines')
        }

    }

}
