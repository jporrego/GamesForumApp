const request = require("request");
const cheerio = require("cheerio");

request(
  "https://www.denofgeek.com/games/best-video-games-2010s-decade/",
  (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      // ------ Games
      const games = [];
      let key = 0;

      $("h2").each((i, game) => {
        const gameObject = {};

        // --- Get Title ---
        if ($(game).parent().hasClass("flow-spacing")) {
          let title = $(game).text().split("");
          title = title.filter((x) => /^[A-Z\s:,.]$/i.test(x));
          title = title.join("").slice(1).trim();
          gameObject.title = title;
        }

        // --- Get Summary ---
        if ($(game).parent().hasClass("flow-spacing")) {
          let summary = $(game).next().next().text();
          if (summary === "") {
            $("p").each((i, pItem) => {
              if ($(pItem).text().includes(gameObject.title)) {
                summary = $(pItem).text();
              }
            });
          }
          if (summary === "") {
            console.log(gameObject.title);
          }
          gameObject.summary = summary;
        }

        // --- Get Image ---
        if ($(game).parent().hasClass("flow-spacing")) {
          const img = $(game).prev().find("img").attr("data-src");

          gameObject.img = img;
        }

        // --- Get Platform ---
        if ($(game).parent().hasClass("flow-spacing")) {
          let platform = $(game).next().text();
          if (platform === "") {
            platform = $(game)
              .parent()
              .parent()
              .next()
              .find(".flow-spacing")
              .text();
          }
          platform = platform.trim().split("|")[2];
          if (platform === undefined) {
            platform = "-";
          } else {
            platform = platform.trim();
          }
          gameObject.platform = platform;
        } /*

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
        }*/
        gameObject.key = key;
        key++;
        games.push(gameObject);
      });
      console.log(
        games
      ); /*
      let gamesJSON = JSON.stringify(games);
      let fs = require("fs");
      fs.writeFile("games_v2.json", gamesJSON, function (err) {
        if (err) throw err;
        console.log("Complete");
      });*/
    }
  }
);
