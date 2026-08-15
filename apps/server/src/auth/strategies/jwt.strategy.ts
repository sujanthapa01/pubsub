import { Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import JwtConfigruation from "../config/jwt-auth-config"
import type { ConfigType } from "@nestjs/config"
import { AuthService } from "../auth.service"
import { RedisService } from "../../redis/redis.service"



const cookieExtractor = (req: any) => {
    console.log("cookie:", req.cookies);
    return req?.cookies?.access_token;
}


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(@Inject(JwtConfigruation.KEY)
    JwtConfig: ConfigType<typeof JwtConfigruation>,
        private authService: AuthService, private cache: RedisService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
            ignoreExpiration: false,
            secretOrKey: JwtConfig.JWT_SECRET
        })
    }


    async validate(payload: any) {


        const cached = await this.cache.get(`user:${payload.id}`)
        if (cached) {
            return cached
        }

        const user = await this.authService.findById(payload.id)

        if (!user) {
            throw new UnauthorizedException()
        }

        await this.cache.set(`user:${user.id}`, user, 60 * 60 * 24)
        return {
            id: user.id,
            email: user.email,
        }
    }

}