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

  describe("GET /games", () => {
    it("should return 200 OK", async () => {
      const res = await request(server).get("/games");
      expect(res.status).toBe(200);
    });
    it("should return JSON", async () => {
      const res = await request(server).get("/games");
      expect(res.type).toBe("application/json");
    });
    it("should return array if empty", async () => {
      const response = await request(server).get("/games");
      expect(function(res) {
        Array.isArray(res.body.games);
      });
    });
  });

  describe("POST /games", () => {
    it("should return status 422 if information is incomplete", async () => {
      const res = await request(server).post("/games");
      expect(res.status).toBe(422);
    });
    it("should return status 200 OK", async () => {
      const newGame = { title: "Test", genre: "works", releaseYear: 2019 };
      const res = await request(server)
        .post("/games")
        .send(newGame);
      expect(res.status).toBe(200);
    });
    it("should return JSON", async () => {
      const res = await request(server).get("/games");
      expect(res.type).toBe("application/json");
    });
  });
});
