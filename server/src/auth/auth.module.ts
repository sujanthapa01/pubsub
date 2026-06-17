import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {ConfigModule} from "@nestjs/config"
import googleOAuthConfig from "./config/google-oauth-config"
import {GoogleStrategy} from "./strategies/google-oauth.strategy"

@Module({
  imports :[ConfigModule.forFeature(googleOAuthConfig)],
  controllers: [AuthController],
  providers: [AuthService,GoogleStrategy],
})
export class AuthModule {}
