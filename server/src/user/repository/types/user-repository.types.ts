import {User} from "../../../../generated/prisma/browser"

export interface UserRepository {
    findById(id: string): Promise <User | null>;
}