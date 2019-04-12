const express = require("express");
const Games = require("../games/gamesModel.js");

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

server.post("/games", async (req, res) => {
  const { title, genre, releaseYear } = req.body;
  if (!title || !genre || !releaseYear) {
    res
      .status(422)
      .json({
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
      res
        .status(405)
        .json({
          message: `Error processing your request, ${err}`,
          error: true
        });
    }
  }
});

module.exports = server;
