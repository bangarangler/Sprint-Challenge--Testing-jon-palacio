// REQUIRE EXPRESS FUNCTIONS FOR GAMES AND DB
const express = require("express");
const Games = require("../games/gamesModel.js");
const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

// GET ENDPOINT FOR /
server.get("/", async (req, res) => {
  res.status(200).json({ api: "up" });
});

// GET ENDPOINT FOR /games
server.get("/games", async (req, res) => {
  try {
    const games = await Games.getAll();
    res
      .status(200)
      .json({ message: "Here are the list of games you requested", games });
  } catch (err) {
    res.status(500).json({ message: `Internal Error, ${err}`, error: true });
  }
});

// POST ENDPOINT FOR /games
// SOME STRETCH REQUIRMENTS IN HERE WITH NORMAL WORK
server.post("/games", async (req, res) => {
  const { title, genre, releaseYear } = req.body;
  // IF NO TITLE GENRE OR RELEASE YEAR RETURN 422
  if (!title || !genre || !releaseYear) {
    res.status(422).json({
      message: `You must provide title, genre, and release year!`,
      error: true
    });
  } else {
    try {
      const newGame = await Games.insert(req.body);
      if (newGame) {
        res
          .status(200)
          .json({ message: "new game listing created!", game: newGame });
      } else {
        res.status(404).json({ message: "Error creating game in database" });
      }
    } catch (err) {
      res.status(405).json({
        message: `Not Allowed, ${err}`,
        error: true
      });
    }
  }
});

// STRETCH GET ENDPOINT FOR SINGLE GAME
// GET ENDPOINT FOR SINGLE GAME
server.get("/games/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const GAME = await Games.getGameById(id);
    if (GAME) {
      res.status(200).json(GAME);
    } else {
      res.status(404).json({ message: "Game not found" });
    }
  } catch (err) {
    res.status(500).json({ message: `Internal error, ${err}` });
  }
});

// STRETCH DELETE ENDPOINT FOR A SINGLE GAME
server.delete("/games/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const tempGame = await Games.deleteGame(id);
    return tempGame
      ? res.status(200).json(tempGame)
      : res.status(404).json({ message: `Can't find game for that id` });
  } catch (err) {
    res.status(500).json({ message: `Internal Error, ${err}`, error: true });
  }
});

module.exports = server;
