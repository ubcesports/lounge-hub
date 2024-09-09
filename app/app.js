const express = require("express");
const app = express();
const db = require("./db");
const port = 5000;

app.get("/", async (req, res) => {
  try {
    const result = await db.query('SELECT current_database()');
    res.send(result);
  } catch (err) {
    console.error(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
