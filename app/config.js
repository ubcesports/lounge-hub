import dotenv from "dotenv";

dotenv.config();

export const schema =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_SCHEMA
    : process.env.LIVE_SCHEMA;

export const user = process.env.DB_USER;
export const database = process.env.DB_NAME;
export const host = process.env.DB_HOST;
export const password = process.env.DB_PASS;
export const port = process.env.DB_PORT;
