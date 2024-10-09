import request from "supertest";
import { expect } from "chai";
import app from "../app.js";
import db from "../db.js";

describe("Activity API", () => {
  // Clean up the database before each test
  beforeEach(async () => {
    await db.query("DROP TABLE IF EXISTS users_test.gamer_activity_test");
    await db.query(
      "CREATE TABLE users_test.gamer_activity_test (LIKE users_test.gamer_activity INCLUDING ALL)",
    );
  });

  // Clean up the database after each test
  afterEach(async () => {
    await db.query("DROP TABLE IF EXISTS users_test.gamer_activity_test");
  });

  it("should add an activity", (done) => {
    request(app)
      .post("/api/activity")
      .send({
        student_number: "11223344",
        pc_number: 1,
        game: "Valorant",
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property("student_number", "11223344");
        expect(res.body).to.have.property("pc_number", 1);
        expect(res.body).to.have.property("game", "Valorant");
        done();
      });
  });

  it("should return 404 if FK user does not exist", (done) => {
    request(app)
      .post("/api/activity")
      .send({
        student_number: "09090909", // non existent
        pc_number: 1,
        game: "Valorant",
      })
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.equal("Foreign key 09090909 not found.");
        done();
      });
  });

  it("should patch an existing activity", (done) => {
    request(app)
      .post("/api/activity")
      .send({
        student_number: "11223344",
        pc_number: 1,
        game: "Valorant",
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property("ended_at", null);

        request(app)
          .patch("/api/activity/update/11223344")
          .expect(201)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body).to.have.property("student_number", "11223344");
            expect(res.body).to.have.property("pc_number", 1);
            expect(res.body).to.have.property("game", "Valorant");
            expect(res.body).to.have.property("ended_at").and.not.to.be.null;
            done();
          });
      });
  });

  it("should return 404 if student does not have active activity", (done) => {
    request(app)
    .patch("/api/activity/update/11223344")
    .expect(404)
    .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.equal("Student not active.");
        done();
      });
  });

  
  it("should get a gamer activities", (done) => {
    request(app)
      .post("/api/activity")
      .send({
        student_number: "11223344",
        pc_number: 1,
        game: "Valorant",
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);

        request(app)
        .post("/api/activity")
        .send({
          student_number: "87654321",
          pc_number: 2,
          game: "Valorant",
        })
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);

            request(app)
            .get("/api/activity/all/recent")
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.length).to.be.at.most(20);
                done();
            });
        });
    });
  });

  
  it("should get gamer activities for specific student", (done) => {
    request(app)
      .post("/api/activity")
      .send({
        student_number: "11223344",
        pc_number: 1,
        game: "Valorant",
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);

        request(app)
        .post("/api/activity")
        .send({
          student_number: "87654321",
          pc_number: 2,
          game: "Valorant",
        })
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);

            request(app)
            .get("/api/activity/87654321")
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                res.body.forEach((item) => {
                    expect(item).to.have.property("student_number", "87654321");
                });
                done();

            });
        });
    });
  });

});
