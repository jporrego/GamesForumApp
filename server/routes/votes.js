const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const pool = require("../config/db");

// @route POST api/votes
// @desc Follow game
// @access Private
router.post("/", async (req, res) => {
  try {
    const {
      user_account_id,
      comment_id,
      positive_vote,
      remove_vote,
    } = req.body;

    // Check to remove vote
    if (remove_vote) {
      const removeVote = await pool.query(
        "DELETE FROM vote WHERE user_account_id = $1 and comment_id = $2",
        [user_account_id, comment_id]
      );
      return res.status(200).send("Vote removed");
    }
    // Check vote is positive or negative
    let newVote;
    if (positive_vote) {
      newVote = await pool.query(
        "INSERT INTO vote (user_account_id, comment_id, positive_vote) VALUES($1, $2, $3) RETURNING *",
        [user_account_id, comment_id, true]
      );
    } else {
      newVote = await pool.query(
        "INSERT INTO vote (user_account_id, comment_id, positive_vote) VALUES($1, $2, $3) RETURNING *",
        [user_account_id, comment_id, false]
      );
    }

    res.json(newVote.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/votes
// @desc Get votes of a comment
// @access Public
router.get("/", async (req, res) => {
  try {
    let votes;
    if (req.query.checkIfUserVoted === "false") {
      votes = await pool.query("SELECT * FROM vote WHERE comment_id = $1;", [
        req.query.comment_id,
      ]);
    } else {
      votes = await pool.query(
        "SELECT * FROM vote WHERE comment_id = $1 AND user_account_id = $2;",
        [req.query.comment_id, req.query.user_account_id]
      );
    }

    res.json(votes.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
