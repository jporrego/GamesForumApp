const express = require("express");
const cors = require("cors");
const pool = require("./config/db");

const app = express();

//middleware
app.use(cors());
app.use(express.json({ extended: false }));

// --- ROUTES ---
// create a game
app.use("/api/games", require("./routes/games"));
// get all games
app.use("/api/games", require("./routes/games"));
// get a game

app.listen(5000, (req, res) => {
  console.log("Server started.");
});
