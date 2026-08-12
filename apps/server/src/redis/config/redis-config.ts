import {registerAs} from "@nestjs/config"

export default registerAs("redis",()=>({
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_UR,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN
}))