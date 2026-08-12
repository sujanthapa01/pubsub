import { Injectable } from "@nestjs/common"
import { DatabaseService } from "../database/database.service"
import { IGuidelineService } from "./types/guideline-service.type"
import {CURRENT_GUIDELINES_VERSION} from "../guideline/constants/quote-guidelines"

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


    getCurrentVersion(): string {
        return CURRENT_GUIDELINES_VERSION
    }

}