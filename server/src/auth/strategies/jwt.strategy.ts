import { Inject, Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import JwtConfigruation from "../config/jwt-auth-config"
import type { ConfigType } from "@nestjs/config"



const cookieExtractor = (req: any) => {
    console.log("cookie:", req.cookies);
    return req?.cookies?.access_token;
}


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(@Inject(JwtConfigruation.KEY)
    JwtConfig: ConfigType<typeof JwtConfigruation>) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
            ignoreExpiration: false,
            secretOrKey: JwtConfig.JWT_SECRET
        })
    }


    async validate(payload: any) {
        return {
            id: payload.id,
            email: payload.email
        }
    }

}