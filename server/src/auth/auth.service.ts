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

    async findById(user_id: string) {
        try {
            const user = await this.database.user.findUnique({ where: { id: user_id } })
            return user
        } catch (error: any) {
            throw new BadRequestException(error.message)
        }
    }

    // Create a new user
    async createUser(data: { email: string, pictureUrl: string, displayName: string }) {
        try {
            const newUser = await this.database.user.create({ data: { email: data.email, picture: data.pictureUrl, display_name: data.displayName } })
            return newUser
        } catch (error: any) {
            throw new BadRequestException(error.message)
        }
    }

    generateJwtToken(user: {
        id: string,
        email: string
    }) {

        const payload = {
            id: user.id,
            email: user.email
        }

        return this.jwtService.signAsync(payload)


    }

}
