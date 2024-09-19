const { Pool } = require("pg");

const pool = new Pool({
  user: "admin",
  host: "54.245.134.32",
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
