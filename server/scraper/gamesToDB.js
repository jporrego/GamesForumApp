const fetch = require("node-fetch");
const fs = require("fs");

const addGamesToDB = async () => {
  let games;
  try {
    const rawData = await fs.readFileSync("./games.json");
    games = JSON.parse(rawData);
  } catch (error) {
    console.error(error);
  }

  for (const game of games) {
    try {
      const response = await fetch("http://localhost:5000/api/games", {
        method: "post",
        body: JSON.stringify(game),
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();

      console.log(json);
    } catch (error) {
      console.error(error);
    }
  }
};

addGamesToDB();
