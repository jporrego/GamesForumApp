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

module.exports = router;
