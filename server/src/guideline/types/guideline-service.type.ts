import {User} from "../../../generated/prisma/browser"

export interface IGuidelineService{
    acceptQuoteGuidelines(userId:string): Promise<User>
    getCurrentVersion(): string   
}