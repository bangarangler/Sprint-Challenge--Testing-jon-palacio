const request = require("supertest");
const db = require("../data/dbConfig.js");
const server = require("./server.js");

describe("server.js", () => {
  afterEach(async () => {
    await db("games").truncate();
  });

  it('should return { api: "up" }', async () => {
    const res = await request(server).get("/");
    expect(res.body).toEqual({ api: "up" });
  });
});
