import {registerAs} from "@nestjs/config"

export default registerAs('googleAuth', () => ({
    ClientId: process.env.GOOGLE_CLIENT_ID!,
    ClientSecret: process.env.GOOGLE_CLINT_SECRET!,
    CallbackUrl: process.env.CALLBACK_URL!
}))