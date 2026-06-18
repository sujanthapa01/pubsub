
import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport"
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import googleOauthConfig from "../config/google-oauth-config";
import type { ConfigType } from "@nestjs/config";


// Service's'
import { AuthService } from "../auth.service";



@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        @Inject(googleOauthConfig.KEY)
        private readonly googleConfiguration: ConfigType<typeof googleOauthConfig>,
        private authService: AuthService
    ) {
        super({
            clientID: googleConfiguration.ClientId!,
            clientSecret: googleConfiguration.ClientSecret!,
            callbackURL: googleConfiguration.CallbackUrl,
            scope: ['email', 'profile'],
        })

    }
    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {

        console.log(profile)
        const { emails} = profile;


        const user = await this.authService.findByEmail(emails[0].value)

        if (!user) {
            const newUser = await this.authService.createUser({ email: emails[0].value })
            return newUser
        }

        return { user }
    }
}