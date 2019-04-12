exports.seed = function(knex, Promise) {
  return knex("games").insert([
    { title: "Pokemon", genre: "Role Playing", releaseYear: 1987 },
    { title: "Final Fantasy", genre: "Role Playing", releaseYear: 1996 },
    {
      title: "The Legend of Zelda",
      genre: "High Fantasy Action",
      releaseYear: 1987
    },
    { title: "Mortal Kombar", genre: "Fighting", releaseYear: 1986 },
    { title: "Castlevania", genre: "Dracula", releaseYear: 1992 },
    { title: "Warcraft", genre: "Fictional Universe", releaseYear: 1994 }
  ]);
};
