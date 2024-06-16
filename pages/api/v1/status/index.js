import query from "infra/database";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const databaseName = process.env.POSTGRES_DB;

  const dBVersionResult = await query(`SHOW server_version;`);
  const dbVersionValue = dBVersionResult.rows[0].server_version;

  const dbMaxConnectionsResult = await query(`SHOW max_connections;`);
  const dbMaxConnectionsValue = parseInt(
    dbMaxConnectionsResult.rows[0].max_connections,
  );

  const dbNumConnectionsResult = await query(
    `SELECT count(*)::int AS active_connections FROM pg_stat_activity WHERE state = \'active\';`,
  );
  const dbNumConnectionsValue =
    dbNumConnectionsResult.rows[0].active_connections;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: dbVersionValue,
        max_connections: dbMaxConnectionsValue,
        num_connections: dbNumConnectionsValue,
      },
    },
  });
}

export default status;
