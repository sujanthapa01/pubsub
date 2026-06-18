import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from "@nestjs/config"
import googleOAuthConfig from "./config/google-oauth-config"
import { GoogleStrategy } from "./strategies/google-oauth.strategy"
import { JwtModule } from "@nestjs/jwt"

import {JwtStrategy} from "./strategies/jwt.strategy"
import JwtAuthConfig from "./config/jwt-auth-config"

@Module({
  imports: [ConfigModule.forFeature(googleOAuthConfig),ConfigModule.forFeature(JwtAuthConfig), JwtModule.registerAsync({
     imports: [ConfigModule.forFeature(JwtAuthConfig)],
    inject: [JwtAuthConfig.KEY],
    useFactory: (config) => ({
      secret: config.JWT_SECRET,
      signOptions: {
        expiresIn: config.EXPIRE_IN
      }
    }),
  })],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, JwtStrategy],
})
export class AuthModule { }
