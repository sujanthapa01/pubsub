import { InternalServerErrorException } from "@nestjs/common"
import { DatabaseService } from "../../database/database.service"

export default async function getRandomIndex(db: DatabaseService): Promise<number> {
    try {
        const count = await db.quote.count()

        if (count === 0) {
            throw new Error("no quote found!")
        }
        return Math.floor(Math.random() * count)

    } catch (error: any) {
        throw new InternalServerErrorException(error.message)
    }
}