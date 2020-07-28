const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const pool = require("../config/db");

// @route POST api/comments
// @desc Add new comment
// @access Private
router.post("/", async (req, res) => {
  try {
    const { user_account_id, game_id, comment_text } = req.body;
    const newComment = await pool.query(
      "INSERT INTO comment (user_account_id, game_id, comment_text) VALUES($1, $2, $3) RETURNING *",
      [user_account_id, game_id, comment_text]
    );

    res.json(newComment.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/comments
// @desc Get comments of a game
// @access Public
router.get("/", async (req, res) => {
  try {
    //const { game_id } = req.body;
    const comments = await pool.query(
      "SELECT * FROM comment WHERE game_id = $1 ORDER BY comment_date DESC;",
      [req.query.game_id]
    );

    const date = await pool.query(
      "SELECT comment_date, TO_CHAR(comment_date, 'DD Mon YYYY') FROM comment WHERE game_id = $1 ORDER BY comment_date DESC;;",
      [req.query.game_id]
    );
    let i = 0;
    for (const comment of comments.rows) {
      comment.comment_date = date.rows[i].to_char;
      i++;
    }

    for (const comment of comments.rows) {
      const user = await pool.query(
        "SELECT * FROM user_account WHERE user_account_id = $1;",
        [comment.user_account_id]
      );
      comment.user = user.rows[0];
    }
    /*
    if (!comments.rows) {
      return res.status(400).json({ msg: "No comments for that game_id" });
    }*/
    res.json(comments.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
