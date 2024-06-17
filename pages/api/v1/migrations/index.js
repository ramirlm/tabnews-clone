import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(request, response) {
  const migrations = await migrationRunner({
    databaseUrl: process.env.POSTGRES_URL,
    dryRun: true,
    dir: join("infra", "migrations"),
    migrationsTable: "pgmigrations",
    verbose: true,
    direction: "up",
  });
  response.status(200).json(migrations);
}
