import express from "express";
import db from "../db.js";
import moment from "moment-timezone";
import { schema } from "../config.js";

const router = express.Router();

const FK_VIOLATION = "23503";

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
router.get("/activity/:student_number", async (req, res) => {
  const { student_number } = req.params;
  try {
    const query = `SELECT * FROM ${schema}.gamer_activity WHERE student_number = $1`;
    const result = await db.query(query, [student_number]);

    if (result.rows.length === 0) {
      return res.status(404).send("Student not found");
    }
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
router.get("/activity/all/recent", async (req, res) => {
  try {
    const query = `
        SELECT ${schema}.gamer_activity.*, 
              ${schema}.gamer_profile.first_name, 
              ${schema}.gamer_profile.last_name 
        FROM ${schema}.gamer_activity
        JOIN ${schema}.gamer_profile 
        ON ${schema}.gamer_activity.student_number = ${schema}.gamer_profile.student_number
        ORDER BY ${schema}.gamer_activity.started_at DESC NULLS LAST 
        LIMIT 20;
`;
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
 * @apiError {String} 404 Foreign key not found.
 * @apiError {String} 400 Tier 1 members can only book one PC per day.
 */
router.post("/activity", async (req, res) => {
  const { student_number, pc_number, game } = req.body;
  const started_at = moment()
    .tz("America/Los_Angeles")
    .format("YYYY-MM-DD HH:mm");

  const tierOneCheckQuery = `
    SELECT ga.*
    FROM ${schema}.gamer_activity ga
    JOIN ${schema}.gamer_profile gp ON ga.student_number = gp.student_number
    WHERE ga.student_number = $1
    AND gp.membership_tier = 1
    AND DATE(ga.started_at::timestamp) = DATE($2::timestamp)
  `;
  const query = `INSERT INTO ${schema}.gamer_activity 
        (student_number, pc_number, game, started_at) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *`;

  try {
    const tierOneCheckResult = await db.query(tierOneCheckQuery, [
      student_number,
      started_at,
    ]);
    if (tierOneCheckResult.rows.length > 0) {
      return res
        .status(400)
        .send("Tier 1 members can only sign in once a day.");
    }
    const result = await db.query(query, [
      student_number,
      pc_number,
      game,
      started_at,
    ]);
    res.status(201).send(result.rows[0]);
  } catch (err) {
    if (err.code === FK_VIOLATION) {
      return res.status(404).send(`Foreign key ${student_number} not found.`);
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
router.patch("/activity/update/:student_number", async (req, res) => {
  const ended_at = moment()
    .tz("America/Los_Angeles")
    .format("YYYY-MM-DD HH:mm");
  const { student_number } = req.params;

  const query = `UPDATE ${schema}.gamer_activity
                   SET ended_at = $1 
                   WHERE student_number = $2
                   AND ended_at IS NULL
                   AND started_at = (
                    SELECT MAX(started_at) 
                    FROM ${schema}.gamer_activity 
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

router.get("/activity/all/get-active-pcs", async (req, res) => {
  const query = `SELECT *
    FROM ${schema}.gamer_activity
    JOIN ${schema}.gamer_profile ON 
    ${schema}.gamer_activity.student_number = ${schema}.gamer_profile.student_number
    WHERE ${schema}.gamer_activity.ended_at IS NULL`;

  try {
    const pcs_in_use = await db.query(query);

    res.status(200).send(pcs_in_use.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error getting active PCs: ${err}`);
  }
});

export default router;
