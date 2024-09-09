const { Pool } = require('pg');

const pool = new Pool({
  user: 'admin',
  host: '54.245.134.32',
  database: 'postgres',
  password: 'Password1!',
  port: 5432,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
