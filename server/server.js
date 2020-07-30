const express = require("express");
const cors = require("cors");
const pool = require("./config/db");

const app = express();

//middleware
app.use(cors());
app.use(express.json({ extended: false }));

// --- ROUTES ---
// Create a game and get all games
app.use("/api/games", require("./routes/games"));
// Register users
app.use("/api/users", require("./routes/users"));
// Login
app.use("/api/auth", require("./routes/auth"));
// Make and get Comments
app.use("/api/comments", require("./routes/comments"));
// Follow games and get followers
app.use("/api/followers", require("./routes/followers"));
// Vote comments
app.use("/api/votes", require("./routes/votes"));

app.listen(5000, (req, res) => {
  console.log("Server started.");
});
