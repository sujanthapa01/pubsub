import { PrismaClient } from "../../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

import fs from "fs";
import path from "path";
import csv from "csv-parser";
import "dotenv/config";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const quotes: {
    quote: string;
    author: string;
  }[] = [];

  // seed.ts and CSV are in the same folder
  const csvPath = path.resolve(__dirname, "all_instagram_quotes_dataset.csv");

  console.log("Reading CSV from:", csvPath);

  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", (row) => {
        quotes.push({
          quote: row.Quote?.trim(),
          author: row.Author?.trim(),
        });
      })
      .on("end", () => resolve())
      .on("error", (err) => reject(err));
  });

  console.log(`Found ${quotes.length} quotes`);

  await prisma.quote.createMany({
    data: quotes,
    skipDuplicates: true,
  });

  console.log(`✅ Inserted ${quotes.length} quotes`);
}

main()
  .catch((err) => {
    console.error(err);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });