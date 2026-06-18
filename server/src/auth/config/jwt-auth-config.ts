import {registerAs} from "@nestjs/config"


export default registerAs('jwt', () => ({
    JWT_SECRET: process.env.JWT_SECRET!,
    EXPIRE_IN: process.env.EXPIRE_IN || '7d'
}))