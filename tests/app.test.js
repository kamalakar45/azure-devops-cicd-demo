const request = require("supertest");
const { createApp } = require("../app/app");

describe("API", () => {
  test('GET / returns { message: "Hello CI/CD" }', async () => {
    const app = createApp();

    const res = await request(app).get("/");

    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/application\/json/);
    expect(res.body).toEqual({ message: "Hello CI/CD" });
  });

  test("GET /healthz returns ok json", async () => {
    const app = createApp();

    const res = await request(app).get("/healthz");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});

