const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const pool = require("../config/db");

// @route POST api/games
// @desc Add a new game to the database
// @access Public
router.post("/", async (req, res) => {
  try {
    const game = req.body;
    const newGame = await pool.query(
      "INSERT INTO game (title, img, platform, summary, date) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [game.title, game.img, game.platform, game.summary, game.date]
    );

    res.json(newGame.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/games
// @desc Get all games in database
// @access Public
router.get("/", async (req, res) => {
  try {
    const games = await pool.query("SELECT * FROM game");

    for (const game of games.rows) {
      const comments = await pool.query(
        "SELECT * FROM comment WHERE game_id = $1",
        [game.game_id]
      );
      const comment_count = comments.rows.length;
      game.comment_count = comment_count;
    }
    res.json(games.rows);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
