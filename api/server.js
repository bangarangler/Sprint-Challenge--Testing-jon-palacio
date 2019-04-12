const express = require("express");
const Games = require("../games/gamesModel.js");
const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get("/", async (req, res) => {
  res.status(200).json({ api: "up" });
});

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

// SOME STRETCH REQUIRMENTS IN HERE WITH NORMAL WORK
server.post("/games", async (req, res) => {
  const { title, genre, releaseYear } = req.body;
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
server.get("/games/:id", async (req, res) => {
  const gameId = req.params.id;
  try {
    const GAME = await db("games")
      .where({ id: gameId })
      .first();
    res.status(200).json(GAME);
  } catch (err) {
    res.status(500).json({ message: `Internal error, ${err}` });
  }
});

// STRETCH DELETE ENDPOINT FOR A SINGLE GAME
server.delete("/games/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const tempGame = await db("games")
      .where({ id })
      .del();
    return tempGame
      ? res.status(200).json(tempGame)
      : res.status(404).json({ message: `Can't find game for that id` });
  } catch (err) {
    res.status(500).json({ message: `Internal Error, ${err}`, error: true });
  }
});

module.exports = server;
