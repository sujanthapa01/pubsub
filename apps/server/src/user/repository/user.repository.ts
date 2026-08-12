import { Injectable } from "@nestjs/common"
import { DatabaseService } from "../../database/database.service"
import { IUserRepository } from "./types/user-repository.types"
import { User } from "generated/prisma/browser"
@Injectable()

export class UserRepository implements IUserRepository {
    constructor(private readonly db: DatabaseService) { }

    async findById(id: string): Promise<User | null> {

        const user = await this.db.user.findUnique({ where: { id } })

        return user
    }



}