import { Injectable } from "@nestjs/common"
import { CURRENT_GUIDELINES_VERSION } from "../common/constants/quote-guidelines"
import { DatabaseService } from "../database/database.service"
import { IGuidelineService } from "./types/guideline-service.type"


export class GuidelineService implements IGuidelineService {
    constructor(private readonly db: DatabaseService) { }

    async acceptQuoteGuidelines(userId: string) {
        return this.db.user.update({
            where: { id: userId },
            data: {
                hasAcceptedQuoteGuidelines: true,
                quoteGuidelinesAcceptedAt: new Date(),
                quoteGuidelinesVersion: CURRENT_GUIDELINES_VERSION,
            },
        });
    }
}