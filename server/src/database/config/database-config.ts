import {registerAs} from "@nestjs/config"


export default registerAs('database', () => ({
DATABSE_URL: process.env.DATABASE_URL,
DIRECT_URL : process.env.DIRECT_URL
}))