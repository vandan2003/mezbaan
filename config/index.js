
import dotenv from "dotenv";
dotenv.config();

const config =    {
    DATABASE_USERNAME:process.env.DATABASE_USERNAME,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    PORT: process.env.PORT,
}

export default config;