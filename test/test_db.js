const { Pool } = require("pg");

const pool = new Pool({
  user: "admin",
  host: "54.245.134.32",
  database: "testdb",
  password: "makestuffbreakstuff2022",
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
