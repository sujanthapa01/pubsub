import { Injectable, OnModuleInit, OnModuleDestroy, Inject } from "@nestjs/common";
import { PrismaClient } from "../../generated/prisma/client";
import { PrismaPostgresAdapter } from "@prisma/adapter-ppg";
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
            adapter: new PrismaPostgresAdapter({
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