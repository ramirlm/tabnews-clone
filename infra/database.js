import pg from "pg";

async function database() {
  const { Client } = pg;
  const client = new Client();
  await client.connect();
  const res = await client.query("SELECT $1::text as message", [
    "Hello world!",
  ]);
  await client.end();
}
export default database;
