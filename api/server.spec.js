const request = require("supertest");
const db = require("../data/dbConfig.js");
const server = require("./server.js");

describe("server.js", () => {
  afterEach(async () => {
    await db("games").truncate();
  });

  //  SHOULD RETURN { api: "up" } FROM GET / ENDPOINT
  it('should return { api: "up" }', async () => {
    const res = await request(server).get("/");
    expect(res.body).toEqual({ api: "up" });
  });

  describe("GET /games", () => {
    it("should return 200 OK", async () => {
      const res = await request(server).get("/games");
      expect(res.status).toBe(200);
    });
    // SHOULD RETURN JSON FOR GET /GAMES ENDPOINT
    it("should return JSON", async () => {
      const res = await request(server).get("/games");
      expect(res.type).toBe("application/json");
    });
    // TEST TO RETURN EMPTY ARRAY IF NO GAMES IN DB
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
    // TEST SHOULD RETURN 200 STATUS CODE
    it("should return status 200 OK", async () => {
      const newGame = { title: "Test", genre: "works", releaseYear: 2019 };
      const res = await request(server)
        .post("/games")
        .send(newGame);
      expect(res.status).toBe(200);
    });
    // TEST TO RETURN JSON FOR POST /GAME ENDPOINT
    it("should return JSON", async () => {
      const res = await request(server).get("/games");
      expect(res.type).toBe("application/json");
    });

    // STRETCH THROW ERROR IF DUPICATE TITLE IS ATTEMPTED TEST
    it("should throw err if duplicate title is attempted", async () => {
      const newAttempt = { title: "Jon", genre: "stretch", releaseYear: 2019 };
      const newAttempt2 = { title: "Jon", genre: "Me", releaseYear: 2017 };
      const result = await request(server)
        .post("/games")
        .send(newAttempt);
      const result2 = await request(server)
        .post("/games")
        .send(newAttempt2);
      expect(result2.status).toBe(405);
    });
  });
});
