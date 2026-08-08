import {User} from "../../../../generated/prisma/browser"

export interface IUserRepository {
    findById(id: string): Promise <User | null>;
}