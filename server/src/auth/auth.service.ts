import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from "../database/database.service"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class AuthService {

    constructor(private readonly database: DatabaseService,
        private jwtService: JwtService
    ) { }


    // Find User by Email
    async findByEmail(email: string) {

        try {
            const user = await this.database.user.findUnique({ where: { email } });
            return user;
        } catch (error: any) {
            throw new BadRequestException(error.message)
        }

    }

    // Create a new user
    async createUser(data: { email: string }) {
        try {
            const newUser = await this.database.user.create({ data })
            // console.log(newUser)
            return newUser
        } catch (error: any) {
            throw new BadRequestException(error.message)
        }
    }


    async generateJwtToken(user: {
        id: string,
        email: string
    }) {

        const payload = {
            id: user.id,
            email: user.email
        }
        let token = await this.jwtService.signAsync(payload)
        console.log(token)
        return { access_token: token }


    }

}
