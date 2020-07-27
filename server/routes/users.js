const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const pool = require("../config/db");

// @route POST api/users
// @desc Register a new user
// @access Public
router.post(
  "/",
  [
    check("name", "Please add a name").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // --- Check if email already exists
      const user_email = req.body.email;
      let email_exists = await pool.query(
        `SELECT email FROM user_account WHERE email = '${user_email}';`
      );

      if (email_exists.rows[0]) {
        return res.status(400).json({ msg: "That email is already in use" });
      }
      // --- Create new user
      const user = req.body;

      // Salt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);

      // Add new user to database
      const newUser = await pool.query(
        "INSERT INTO user_account (name, email, password) VALUES($1, $2, $3) RETURNING *",
        [user.name, user.email, user.password]
      );

      // Generate user token
      const createdUser = await pool.query(
        `SELECT user_account_id FROM user_account WHERE email = '${user_email}';`
      );

      const payload = {
        user: {
          id: createdUser.id,
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

      //res.json(newUser.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;