import { Module } from "@nestjs/common"
import { RedisService } from "./redis.service"
import { ConfigModule } from "@nestjs/config"
import RedisConfigration from "./config/redis-config"

@Module({
    imports: [ConfigModule.forRoot({
        load: [RedisConfigration],
        isGlobal: true
    })],
    providers: [RedisService],
    exports: [RedisService]
})


export class RedisModule { }