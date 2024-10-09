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

/**
 * @api {get} /activity/:student_number Get Gamer Activity for specific student
 * @apiName GetGamerActivityByStudent
 * @apiGroup Activity
 *
 * @apiParam {String} student_number Student's unique number.
 *
 * @apiSuccess {Object} gamer_activity Gamer activity object.
 * @apiSuccess {String} gamer_activity.student_number Student number, 8 digit integer.
 * @apiSuccess {Number} gamer_activity.pc_number PC number.
 * @apiSuccess {String} gamer_activity.game Game name.
 * @apiSuccess {String} gamer_activity.started_at Datetime when the activity started.
 * @apiSuccess {String} gamer_activity.ended_at Datetime when the activity ended.
 *
 * @apiError {String} 500 Server error.
 */
app.get("/api/activity/:student_number", async (req, res) => {
  const { student_number } = req.params;
  try {
    const query =
      "SELECT * FROM users_test.gamer_activity WHERE student_number = $1";
    const result = await db.query(query, [student_number]);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error finding gamer activity: ${err}`);
  }
});

/**
 * @api {get} /activity/all/recent Get Gamer Activity
 * @apiName GetGamerActivity
 * @apiGroup Activity
 *
 * @apiSuccess {Object} gamer_activity Gamer activity object.
 * @apiSuccess {String} gamer_activity.student_number Student number, 8 digit integer.
 * @apiSuccess {Number} gamer_activity.pc_number PC number.
 * @apiSuccess {String} gamer_activity.game Game name.
 * @apiSuccess {String} gamer_activity.started_at Datetime when the activity started.
 * @apiSuccess {String} gamer_activity.ended_at Datetime when the activity ended.
 *
 * @apiError {String} 500 Server error.
 */
app.get("/api/activity/all/recent", async (req, res) => {
  try {
    const query = `SELECT * FROM users_test.gamer_activity
      ORDER BY started_at 
      DESC LIMIT 20;`;
    const result = await db.query(query);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error finding recent activity: ${err}`);
  }
});

/**
 * @api {post} /activity Add Gamer Activity
 * @apiName AddGamerActivity
 * @apiGroup Activity
 *
 * @apiParam {String} student_number Student number, 8 digit integer.
 * @apiParam {String} pc_number PC number.
 * @apiParam {String} game Game name.
 * @apiParam {Number} started_at Date when the activity started.
 *
 * @apiSuccess {Object} gamer_activity Gamer profile object.
 * @apiSuccess {String} gamer_activity.student_number Student number, 8 digit integer.
 * @apiSuccess {Number} gamer_activity.pc_number PC number.
 * @apiSuccess {String} gamer_activity.game Game name.
 * @apiSuccess {String} gamer_activity.started_at Datetime when the activity started.
 *
 * @apiError {String} 500 Server error.
 */
app.post("/api/activity", async (req, res) => {
  const { student_number, pc_number, game } = req.body;
  const started_at = moment()
    .tz("America/Los_Angeles")
    .format("YYYY-MM-DD HH:mm");

  const query = `INSERT INTO users_test.gamer_activity 
      (student_number, pc_number, game, started_at) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *`;

  try {
    const result = await db.query(query, [
      student_number,
      pc_number,
      game,
      started_at,
    ]);
    res.status(201).send(result.rows[0]);
  } catch (err) {
    if (err.code === "23503") {
      res.status(404).send(`Foreign key ${student_number} not found.`);
    }
    res.status(500).send(`Error creating activity: ${err}`);
  }
});

/**
 * @api {patch} /activity/update/:student_number Update Gamer Activity End Time
 * @apiName UpdateGamerActivity
 * @apiGroup Activity
 *
 * @apiParam {String} student_number Student number, 8 digit integer.
 *
 * @apiSuccess {Object} gamer_activity Gamer profile object.
 * @apiSuccess {String} gamer_activity.student_number Student number, 8 digit integer.
 * @apiSuccess {Number} gamer_activity.pc_number PC number.
 * @apiSuccess {String} gamer_activity.game Game name.
 * @apiSuccess {String} gamer_activity.started_at Datetime when the activity started.
 * @apiSuccess {String} gamer_activity.ended_at Datetime when the activity ended.
 *
 * @apiError {String} 500 Internal server error.
 */

app.patch("/api/activity/update/:student_number", async (req, res) => {
  const ended_at = moment()
    .tz("America/Los_Angeles")
    .format("YYYY-MM-DD HH:mm");
  const { student_number } = req.params;

  const query = `UPDATE users_test.gamer_activity
                 SET ended_at = $1 
                 WHERE student_number = $2
                 AND ended_at IS NULL
                 AND started_at = (
                  SELECT MAX(started_at) 
                  FROM users_test.gamer_activity 
                  WHERE student_number = $2
                )
                 RETURNING *`;

  try {
    const result = await db.query(query, [ended_at, student_number]);
    if (result.rows.length === 0) {
      return res.status(404).send("Student not active.");
    }
    res.status(201).send(result.rows[0]);
  } catch (err) {
    res.status(500).send(`Error updating activity: ${err}`);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
