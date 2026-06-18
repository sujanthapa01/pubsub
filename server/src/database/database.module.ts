import {Global, Module} from "@nestjs/common"
import {DatabaseService} from "./database.service"
import {ConfigModule} from "@nestjs/config"

import databaseConfiguration from "./config/database-config"

@Global()
@Module({
  
    imports: [ConfigModule.forFeature(databaseConfiguration)],
    providers : [DatabaseService],
    exports :[DatabaseService]
})

export  class DatabaseModule {}