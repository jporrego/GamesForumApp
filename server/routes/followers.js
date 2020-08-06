const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const pool = require("../config/db");

// @route POST api/followers
// @desc Follow game
// @access Private
router.post("/", async (req, res) => {
  try {
    const { user_account_id, game_id } = req.body;
    // Check if user already follows game
    const existsFollow = await pool.query(
      "SELECT* FROM follow WHERE user_account_id = $1 and game_id = $2",
      [user_account_id, game_id]
    );

    if (existsFollow.rows.length > 0) {
      const unfollow = await pool.query(
        "DELETE FROM follow WHERE user_account_id = $1 and game_id = $2",
        [user_account_id, game_id]
      );
      return res.json(unfollow);
    }
    const newFollow = await pool.query(
      "INSERT INTO follow (user_account_id, game_id) VALUES($1, $2) RETURNING *",
      [user_account_id, game_id]
    );

    res.json(newFollow.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/followers
// @desc Get comments of a game
// @access Public
router.get("/", async (req, res) => {
  try {
    const { user_account_id, game_id } = req.query;
    // Check if user already follows game
    const userFollowsGame = await pool.query(
      "SELECT * FROM follow WHERE user_account_id = $1 and game_id = $2",
      [user_account_id, game_id]
    );

    if (!userFollowsGame.rows[0]) {
      return res.json({ msg: "Unfollow" });
    }
    res.json(userFollowsGame.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
