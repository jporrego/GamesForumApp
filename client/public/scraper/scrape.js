const request = require("request");
const cheerio = require("cheerio");

request(
  "https://www.metacritic.com/browse/games/score/metascore/all/all/filtered",
  (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      // ------ Games
      const games = [];
      let key = 0;

      $("h3").each((i, game) => {
        const gameObject = {};

        // --- Get Title ---
        if ($(game).parent().hasClass("title")) {
          const title = $(game).text().replace(/\s\s+/g, "");
          gameObject.title = title;
        }

        // --- Get Summary ---
        if ($(game).parent().hasClass("title")) {
          const summary = $(game)
            .parent()
            .parent()
            .children(".summary")
            .text()
            .replace(/\s\s+/g, "");
          gameObject.summary = summary;
        }

        // --- Get Image ---
        if ($(game).parent().hasClass("title")) {
          const img = $(game)
            .parent()
            .parent()
            .parent()
            .children(".clamp-image-wrap")
            .find("img")
            .attr("src")
            .replace(/\s\s+/g, "");

          gameObject.img = img;
        }

        // --- Get Platform ---
        if ($(game).parent().hasClass("title")) {
          const platform = $(game)
            .parent()
            .parent()
            .children(".clamp-details")
            .children(".platform")
            .children(".data")
            .text()
            .replace(/\s\s+/g, "");

          gameObject.platform = platform;
        }

        // --- Get Date ---
        if ($(game).parent().hasClass("title")) {
          const date = $(game)
            .parent()
            .parent()
            .children(".clamp-details")
            .children("span")
            .text()
            .replace(/(,)+/g, "");

          gameObject.date = date;
        }
        if (Object.entries(gameObject).length != 0) {
          let gameExists;
          for (const game of games) {
            if (game.title === gameObject.title) {
              gameExists = true;
            }
          }
          if (!gameExists) {
            gameObject.key = key;
            key++;
            games.push(gameObject);
          }
        }
      });
      let gamesJSON = JSON.stringify(games);
      let fs = require("fs");
      fs.writeFile("games.json", gamesJSON, function (err) {
        if (err) throw err;
        console.log("Complete");
      });
    }
  }
);
