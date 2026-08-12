import { Injectable, OnModuleInit, OnModuleDestroy, Inject } from "@nestjs/common";
import { PrismaClient } from "../../generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';
import databaseConfiguration from "./config/database-config";
import type { ConfigType } from "@nestjs/config";

@Injectable()
export class DatabaseService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy {
    constructor(@Inject(databaseConfiguration.KEY)
    private readonly DbConfig: ConfigType<typeof databaseConfiguration>) {
        const databaseUrl = DbConfig.DATABSE_URL;
        console.log(databaseUrl)
        super({
            adapter: new PrismaPg({
                connectionString: databaseUrl!,
            }),
        });
    }

    async onModuleInit() {
        await this.$connect();
        console.log("Database connected!");
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}