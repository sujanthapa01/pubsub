import { Injectable, Inject } from "@nestjs/common"
import RedisConfiguration from "./config/redis-config"
import type { ConfigType } from "@nestjs/config"
import { Redis } from "@upstash/redis"

@Injectable()
export class RedisService {

    private readonly redis: Redis

    constructor(@Inject(RedisConfiguration.KEY) private readonly redisConfig: ConfigType<typeof RedisConfiguration>) {
        this.redis = new Redis({
            url: "https://neat-dassie-103478.upstash.io",
            token: "gQAAAAAAAZQ2AAIgcDJmYmFlZjg5MGM3YWE0MTcwOTllZGJkOTdhY2RhODA3MA"
        })
        console.log("redis",redisConfig.UPSTASH_REDIS_REST_TOKEN,redisConfig.UPSTASH_REDIS_REST_URL)
    }


    async get<T>(key: string): Promise<T | null> {
        return this.redis.get<T>(key)
    }


    async set(key: string, value: unknown, ttl = 60) {
        return this.redis.set(key, value, { ex: ttl })
    }

    async del(key: string) {
        return this.redis.del(key)
    }
}
