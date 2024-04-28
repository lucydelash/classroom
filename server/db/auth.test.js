const request = require('supertest');
const app = require('../index');

describe('Authentication Endpoints', () => {
  let testUser;

  // registration endpoint tests
  describe('POST /register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/register')
        .send({ username: 'testuser', password: 'testpassword' });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('username', 'testuser');
      testUser = res.body;
    });
  });

  // login endpoint tests
  describe('POST /login', () => {
    it('should login with valid credentials', async () => {
      const res = await request(app)
        .post('/login')
        .send({ username: testUser.username, password: 'testpassword' });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Login successful');
    });
  });
});