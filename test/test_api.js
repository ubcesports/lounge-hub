import request from 'supertest';
import chai from 'chai';
import app from '../app/app.js';
import db from '../app/db.js';

const { expect } = chai;

describe('Gamer API', () => {
  // Clean up the database before each test
  beforeEach(async () => {
    await db.query('DROP TABLE IF EXISTS users_test.gamer_profile_test');
    await db.query('CREATE TABLE users_test.gamer_profile_test (LIKE users_test.gamer_profile INCLUDING ALL)');
  });

  // Clean up the database after each test
  afterEach(async () => {
    await db.query('DROP TABLE IF EXISTS users_test.gamer_profile_test');
  });

  it('should add a gamer profile', (done) => {
    request(app)
      .post('/gamer')
      .send({
        first_name: 'John',
        last_name: 'Doe',
        student_number: '12345678',
        membership_tier: 1,
        banned: false,
        notes: 'Test user'
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('first_name', 'John');
        expect(res.body).to.have.property('last_name', 'Doe');
        expect(res.body).to.have.property('student_number', '12345678');
        expect(res.body).to.have.property('membership_tier', 1);
        expect(res.body).to.have.property('banned', false);
        expect(res.body).to.have.property('notes', 'Test user');
        done();
      });
  });

  it('should get a gamer profile', (done) => {
    // First, add a gamer profile to ensure it exists
    request(app)
      .post('/gamer')
      .send({
        first_name: 'Jane',
        last_name: 'Doe',
        student_number: '87654321',
        membership_tier: 2,
        banned: false,
        notes: 'Another test user'
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);

        // Then, get the gamer profile
        request(app)
          .get('/gamer/87654321')
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body).to.have.property('first_name', 'Jane');
            expect(res.body).to.have.property('last_name', 'Doe');
            expect(res.body).to.have.property('student_number', '87654321');
            expect(res.body).to.have.property('membership_tier', 2);
            expect(res.body).to.have.property('banned', false);
            expect(res.body).to.have.property('notes', 'Another test user');
            done();
          });
      });
  });

  it('should return 404 for non-existent gamer profile', (done) => {
    request(app)
      .get('/gamer/nonexistent')
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.equal('Student not found');
        done();
      });
  });

  it('should update an existing gamer profile', (done) => {
    // First, add a gamer profile to ensure it exists
    request(app)
      .post('/gamer')
      .send({
        first_name: 'Alice',
        last_name: 'Smith',
        student_number: '11223344',
        membership_tier: 3,
        banned: false,
        notes: 'Initial notes'
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);

        // Then, update the gamer profile
        request(app)
          .post('/gamer')
          .send({
            first_name: 'Alice',
            last_name: 'Smith',
            student_number: '11223344',
            membership_tier: 4,
            banned: true,
            notes: 'Updated notes'
          })
          .expect(201)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body).to.have.property('first_name', 'Alice');
            expect(res.body).to.have.property('last_name', 'Smith');
            expect(res.body).to.have.property('student_number', '11223344');
            expect(res.body).to.have.property('membership_tier', 4);
            expect(res.body).to.have.property('banned', true);
            expect(res.body).to.have.property('notes', 'Updated notes');
            done();
          });
      });
  });
});