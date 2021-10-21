import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";

interface Row {
  guildId: string;
  channelAdminId: string;
  channelWelcomeId: string;
}

export async function openDb(): Promise<Database> {
  console.log("Opening database...");
  
  try {
    const db: Database = await open({
      filename: process.env.DB_FILENAME ?? "defaults.db",
      driver: sqlite3.Database,
    });
    db.exec(
      "CREATE TABLE IF NOT EXISTS Guilds (guildId TEXT, channelAdminId TEXT, channelWelcomeId TEXT)"
    );
    getEverything(db).then((res: any) => console.log(res))

    return db;
  } catch (err: unknown) {
    console.error(err);
    throw err;
  }
}

export async function getEverything(db: Database): Promise<Row[]> {
  const query = "SELECT * FROM Guilds";
  return await db.all<Row[]>(query);
}

export async function getAllGuildIds(db: Database): Promise<Row[]> {
  const query = "SELECT guildId FROM Guilds";
  return await db.all<Row[]>(query);
}

// prettier-ignore
export async function getGuild(db: Database, pGuildId: string): Promise<Row | null> {
  const query = "SELECT * FROM Guilds WHERE guildId = ?";
  const result = await db.get<Row>(query, pGuildId);
  return result ?? null;
}
