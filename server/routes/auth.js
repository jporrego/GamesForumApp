const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const pool = require("../config/db");

// @route POST api/auth
// @desc Login an user
// @access Public
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    // --- Get user
    let user = await pool.query(
      `SELECT * FROM user_account WHERE email = $1;`,
      [email]
    );

    // Check if email exists
    if (!user.rows[0]) {
      return res.status(400).json({ msg: "That email doesn't exist" });
    }
    // Bcrypt ingressed password
    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(400).json({ msg: "Password or Email is incorrect" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      {
        expiresIn: 14400,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
