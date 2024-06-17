// import database from "infra/database.js";

async function cleanDatabase() {
  // await database.query("drop schema public; create schema public;");
}

beforeAll(cleanDatabase);

test("POST to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
});
