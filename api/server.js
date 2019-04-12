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

module.exports = server;
