import { Injectable } from "@nestjs/common"
import { DatabaseService } from "../../database/database.service"
import { UserRepository } from "./types/user-repository.types"
import { User } from "generated/prisma/browser"
@Injectable()

export class DbUserRepository implements UserRepository {
    constructor(private readonly db: DatabaseService) { }

    async findById(id: string): Promise<User | null> {

        const user = await this.db.user.findUnique({ where: { id } })

        return user
    }



}