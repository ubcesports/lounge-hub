import pkg from "pg";
import { user, host, database, password, port } from "./config.js";

const { Pool } = pkg;

const pool = new Pool({
  user: user,
  host: host,
  database: database,
  password: password,
  port: port,
});

const query = (text, params) => pool.query(text, params);

export default pool;
