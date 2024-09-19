const express = require("express");
const db = require("./db");
const bodyParser = require("body-parser");
const moment = require("moment-timezone");

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.get("/gamer/:student_number", async (req, res) => {
  const { student_number } = req.params;
  try {
    const result = await db.query(
      "SELECT * FROM users_test.gamer_profile WHERE student_number = $1",
      [student_number]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Student not found");
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
  }
});

app.post("/gamer", async (req, res) => {
  const { 
    first_name,
    last_name,
    student_number,
    membership_tier,
    banned,
    notes,
  } = req.body;
  const created_at = moment().tz('America/Los_Angeles').format('YYYY-MM-DD');

  try {
    const result = await db.query(
      `INSERT INTO users_test.gamer_profile 
      (first_name, last_name, student_number, membership_tier, banned, notes, created_at) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) 
      ON CONFLICT (student_number) 
      DO UPDATE SET 
        first_name = EXCLUDED.first_name,
        last_name = EXCLUDED.last_name,
        membership_tier = EXCLUDED.membership_tier,
        banned = EXCLUDED.banned,
        notes = EXCLUDED.notes,
        created_at = EXCLUDED.created_at
      RETURNING *`,
      [
        first_name,
        last_name,
        student_number,
        membership_tier,
        banned,
        notes,
        created_at,
      ]
    );
    res.status(201).send(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating gamer");
  }
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
