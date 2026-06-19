import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { sql } from "drizzle-orm";
import * as dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DB_NAME,
});

const db = drizzle(pool);

async function main() {
  try {
    console.log("Clearing database...");
    await db.execute(sql`DELETE FROM recommended_actions;`);
    await db.execute(sql`DELETE FROM signals_friction_gaps;`);
    await db.execute(sql`DELETE FROM signals_leading_questions;`);
    await db.execute(sql`DELETE FROM signals_politeness;`);
    await db.execute(sql`DELETE FROM signals_contradictions;`);
    await db.execute(sql`DELETE FROM analyses;`);
    await db.execute(sql`DELETE FROM transcripts;`);
    await db.execute(sql`DELETE FROM validation_records;`);
    await db.execute(sql`DELETE FROM features;`);
    await db.execute(sql`DELETE FROM users;`);
    console.log("Database cleared successfully.");
  } catch (err) {
    console.error("Error clearing DB:", err);
  } finally {
    await pool.end();
  }
}

main();
