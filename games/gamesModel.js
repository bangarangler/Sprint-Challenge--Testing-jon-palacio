const db = require("../data/dbConfig.js");

module.exports = {
  insert,
  getAll,
  deleteGame,
  getGameById
};

async function insert(game) {
  const [id] = await db("games").insert(game, "id");

  return db("games")
    .where({ id })
    .first();
}

function getAll() {
  return db("games");
}

function getGameById(id) {
  return db("games")
    .where({ id })
    .first();
}

function deleteGame(id) {
  return db("games")
    .where({ id })
    .del();
}
