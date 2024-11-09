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

export default pool;
