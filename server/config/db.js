const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "sinergia123",
  host: "localhost",
  port: 5432,
  database: "gamesforum",
});

module.exports = pool;
