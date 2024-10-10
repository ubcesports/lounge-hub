import request from "supertest";
import { expect } from "chai";
import app from "../app.js";
import db from "../db.js";

describe("Gamer API", () => {
  // Clean up the database before each test
  beforeEach(async () => {
    await db.query("TRUNCATE TABLE test.gamer_profile CASCADE;");
  });

  // Clean up the database after each test
  afterEach(async () => {
    await db.query("TRUNCATE TABLE test.gamer_profile CASCADE;");
  });

  it("should add a gamer profile", (done) => {
    request(app)
      .post("/api/gamer")
      .send({
        first_name: "John",
        last_name: "Doe",
        student_number: "12345678",
        membership_tier: 1,
        banned: false,
        notes: "Test user",
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property("first_name", "John");
        expect(res.body).to.have.property("last_name", "Doe");
        expect(res.body).to.have.property("student_number", "12345678");
        expect(res.body).to.have.property("membership_tier", 1);
        expect(res.body).to.have.property("banned", false);
        expect(res.body).to.have.property("notes", "Test user");
        done();
      });
  });

  it("should get a gamer profile", (done) => {
    request(app)
      .post("/api/gamer")
      .send({
        first_name: "Jane",
        last_name: "Doe",
        student_number: "87654321",
        membership_tier: 2,
        banned: false,
        notes: "Another test user",
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);

        request(app)
          .get("/api/gamer/87654321")
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body).to.have.property("first_name", "Jane");
            expect(res.body).to.have.property("last_name", "Doe");
            expect(res.body).to.have.property("student_number", "87654321");
            expect(res.body).to.have.property("membership_tier", 2);
            expect(res.body).to.have.property("banned", false);
            expect(res.body).to.have.property("notes", "Another test user");
            done();
          });
      });
  });

  it("should return 404 for non-existent gamer profile", (done) => {
    request(app)
      .get("/api/gamer/nonexistent")
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.equal("Student not found");
        done();
      });
  });

  it("should update an existing gamer profile", (done) => {
    request(app)
      .post("/api/gamer")
      .send({
        first_name: "Alice",
        last_name: "Smith",
        student_number: "11223344",
        membership_tier: 3,
        banned: false,
        notes: "Initial notes",
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);

        request(app)
          .post("/api/gamer")
          .send({
            first_name: "Alice",
            last_name: "Smith",
            student_number: "11223344",
            membership_tier: 4,
            banned: true,
            notes: "Updated notes",
          })
          .expect(201)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body).to.have.property("first_name", "Alice");
            expect(res.body).to.have.property("last_name", "Smith");
            expect(res.body).to.have.property("student_number", "11223344");
            expect(res.body).to.have.property("membership_tier", 4);
            expect(res.body).to.have.property("banned", true);
            expect(res.body).to.have.property("notes", "Updated notes");
            done();
          });
      });
  });

  it("should return 400 when data types are invalid", (done) => {
    request(app)
      .post("/api/gamer")
      .send({
        first_name: "John",
        last_name: "Doe",
        student_number: "12345678",
        membership_tier: "invalid",
        banned: "false",
        notes: "Test user",
      })
      .expect(500)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).contains("Error creating gamer");
        done();
      });
  });

  it("should return 500 when student_number is too long", (done) => {
    request(app)
      .post("/api/gamer")
      .send({
        first_name: "John",
        last_name: "Doe",
        student_number: "123456781", // Too long
        membership_tier: 1,
        banned: false,
        notes: "Test user",
      })
      .expect(500)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).contains("Error creating gamer");
        done();
      });
  });

  it("should delete an existing gamer profile", (done) => {
    request(app)
      .post("/api/gamer")
      .send({
        first_name: "Bob",
        last_name: "Brown",
        student_number: "99887766",
        membership_tier: 2,
        banned: false,
        notes: "Test user for deletion",
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);

        request(app)
          .delete("/api/gamer/99887766")
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.text).to.equal("Gamer profile deleted successfully");
            done();
          });
      });
  });

  it("should return 404 when trying to delete a non-existent gamer profile", (done) => {
    request(app)
      .delete("/api/gamer/nonexistent")
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).contains("Student not found");
        done();
      });
  });
});
