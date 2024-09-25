import express from "express";
import moment from "moment-timezone";
import bodyParser from "body-parser";
import db from "./db.js";
import cors from "cors";

const app = express();
app.use(cors());
const port = 8000;

app.use(bodyParser.json());

/**
 * @api {get} /gamer/:student_number Get Gamer Profile
 * @apiName GetGamerProfile
 * @apiGroup Gamer
 *
 * @apiParam {String} student_number Student's unique number.
 *
 * @apiSuccess {Object} gamer_profile Gamer profile object.
 * @apiSuccess {String} gamer_profile.first_name First name.
 * @apiSuccess {String} gamer_profile.last_name Last name.
 * @apiSuccess {String} gamer_profile.student_number Student number, 8 digit integer.
 * @apiSuccess {Number} gamer_profile.membership_tier Membership tier:
 *                                                  0 = No membership
 *                                                  1 = Tier 1
 *                                                  2 = Tier 2
 * @apiSuccess {Boolean} gamer_profile.banned Whether the gamer is banned.
 * @apiSuccess {String} gamer_profile.notes Additional notes.
 * @apiSuccess {String} gamer_profile.created_at Date when the profile was created.
 *
 * @apiError {String} 404 Student not found.
 * @apiError {String} 500 Server error.
 */
app.get("/api/gamer/:student_number", async (req, res) => {
  const { student_number } = req.params;
  try {
    const query =
      "SELECT * FROM users_test.gamer_profile WHERE student_number = $1";
    const result = await db.query(query, [student_number]);
    if (result.rows.length === 0) {
      return res.status(404).send("Student not found");
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error finding gamer: ${err}`);
  }
});

/**
 * @api {post} /gamer Add or Update Gamer Profile
 * @apiName AddOrUpdateGamerProfile
 * @apiGroup Gamer
 *
 * @apiParam {String} first_name First name.
 * @apiParam {String} last_name Last name.
 * @apiParam {String} student_number Student number, 8 digit integer.
 * @apiParam {Number} membership_tier Membership tier.
 * @apiParam {Boolean} banned Whether the gamer is banned.
 * @apiParam {String} notes Additional notes.
 *
 * @apiSuccess {Object} gamer_profile Gamer profile object.
 * @apiSuccess {String} gamer_profile.first_name First name.
 * @apiSuccess {String} gamer_profile.last_name Last name.
 * @apiSuccess {String} gamer_profile.student_number Student number, 8 digit integer.
 * @apiSuccess {Number} gamer_profile.membership_tier Membership tier.
 * @apiSuccess {Boolean} gamer_profile.banned Whether the gamer is banned.
 * @apiSuccess {String} gamer_profile.notes Additional notes.
 * @apiSuccess {String} gamer_profile.created_at Date when the profile was created.
 *
 * @apiError {String} 500 Server error.
 */
app.post("/api/gamer", async (req, res) => {
  const {
    first_name,
    last_name,
    student_number,
    membership_tier,
    banned,
    notes,
  } = req.body;
  const created_at = moment().tz("America/Los_Angeles").format("YYYY-MM-DD");

  const query = `INSERT INTO users_test.gamer_profile 
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
      RETURNING *`;

  try {
    const result = await db.query(query, [
      first_name,
      last_name,
      student_number,
      membership_tier,
      banned,
      notes,
      created_at,
    ]);
    res.status(201).send(result.rows[0]);
  } catch (err) {
    res.status(500).send(`Error creating gamer: ${err}`);
  }
});

/**
 * Deletes a gamer profile.
 *
 * @route DELETE /gamer/:student_number
 * @param {Object} req - The request object.
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.student_number - The student number to delete.
 * @param {Object} res - The response object.
 * @returns {string} 200 - Success message if profile is deleted.
 * @returns {string} 404 - Error message if profile is not found.
 * @returns {string} 500 - Error message if there is a server error.
 */
app.delete("/api/gamer/:student_number", async (req, res) => {
  const { student_number } = req.params;

  try {
    const result = await db.query(
      "DELETE FROM users_test.gamer_profile WHERE student_number = $1 RETURNING *",
      [student_number],
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Student not found");
    }

    res.status(200).send("Gamer profile deleted successfully");
  } catch (err) {
    res.status(500).send(`Student not found: ${err}`);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
