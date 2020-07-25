const express = require("express");

const app = express();

//middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.json({ msg: "Welcome" }));
app.get("/about", (req, res) => res.json({ msg: "About" }));

app.listen(5000, (req, res) => {
  console.log("Server started.");
});
