
import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport"
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import googleOauthConfig from "../config/google-oauth-config";
import type { ConfigType } from "@nestjs/config";



@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        @Inject(googleOauthConfig.KEY)
        private readonly googleConfiguration: ConfigType<typeof googleOauthConfig>,
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
    }
}