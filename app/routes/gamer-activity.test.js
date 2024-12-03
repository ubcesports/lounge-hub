import { describe, it, afterEach, after, beforeEach } from "mocha";
import request from "supertest";
import { expect } from "chai";
import app from "../app.js";
import db from "../db.js";

describe("Activity API", () => {
  // Clean up the database before each test
  beforeEach(async () => {
    await db.query("TRUNCATE TABLE test.gamer_profile CASCADE;");
    const mock1 = `
      INSERT INTO test.gamer_profile 
      (first_name, last_name, student_number, membership_tier) 
      VALUES ('John', 'Doe', '11223344', 1);
    `;
    const mock2 = `
      INSERT INTO test.gamer_profile 
      (first_name, last_name, student_number, membership_tier) 
      VALUES ('Jane', 'Doe', '87654321', 2);
    `;
    await db.query(mock1);
    await db.query(mock2);
    await db.query("TRUNCATE TABLE test.gamer_activity;");
  });

  // Clean up the database after each test
  afterEach(async () => {
    await db.query("TRUNCATE TABLE test.gamer_activity;");
  });

  after(async () => {
    await db.query("TRUNCATE TABLE test.gamer_profile CASCADE;");
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
        expect(res.body).to.have.property("exec_name", null);
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
          .patch("/api/activity/update/11223344/John")
          .expect(201)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body).to.have.property("student_number", "11223344");
            expect(res.body).to.have.property("pc_number", 1);
            expect(res.body).to.have.property("game", "Valorant");
            expect(res.body).to.have.property("ended_at").and.not.equal(null);
            expect(res.body).to.have.property("exec_name", "John");
            done();
          });
      });
  });

  it("should return 404 if student does not have active activity", (done) => {
    request(app)
      .patch("/api/activity/update/11223344/John")
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
      .end((err) => {
        if (err) return done(err);

        request(app)
          .post("/api/activity")
          .send({
            student_number: "87654321",
            pc_number: 2,
            game: "Valorant",
          })
          .expect(201)
          .end((err) => {
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
      .end((err) => {
        if (err) return done(err);

        request(app)
          .post("/api/activity")
          .send({
            student_number: "87654321",
            pc_number: 2,
            game: "Valorant",
          })
          .expect(201)
          .end((err) => {
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

  it("should throw 400 error if tier 1 member tries to check in more than once a day", (done) => {
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

        request(app)
          .patch("/api/activity/update/11223344")
          .expect(201)
          .end((err) => {
            if (err) return done(err);

            request(app)
              .post("/api/activity")
              .send({
                student_number: "11223344",
                pc_number: 2,
                game: "CS:GO",
              })
              .expect(400)
              .end((err, res) => {
                if (err) return done(err);
                expect(res.text).to.equal(
                  "Tier 1 members can only sign in once a day.",
                );
                done();
              });
          });
      });
  });

  it("should allow tier 2 member to check in two times a day", (done) => {
    request(app)
      .post("/api/activity")
      .send({
        student_number: "87654321",
        pc_number: 1,
        game: "Valorant",
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property("student_number", "87654321");
        expect(res.body).to.have.property("pc_number", 1);
        expect(res.body).to.have.property("game", "Valorant");

        request(app)
          .patch("/api/activity/update/87654321")
          .expect(201)
          .end((err) => {
            if (err) return done(err);

            request(app)
              .post("/api/activity")
              .send({
                student_number: "87654321",
                pc_number: 2,
                game: "CS:GO",
              })
              .expect(201)
              .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.have.property("student_number", "87654321");
                expect(res.body).to.have.property("pc_number", 2);
                expect(res.body).to.have.property("game", "CS:GO");
                done();
              });
          });
      });
  });
});
