const listHelper = require('../utils/list_helper');
const supertest = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

const api = supertest(app);

beforeAll((done) => {
  done();
});

describe('creation', () => {
  test('invalid user created with empty username and password', async () => {
    const user = { username: "", password: "", name: "dasdas" }
    const response = await api.post("/api/users").send(user).expect(404)
    expect(response.body.message).toBe("username and password required")
  })
  test('invalid user created with password length smaller than 3', async () => {
    const user = { username: "daw", password: "da", name: "dasdas" }
    const response = await api.post("/api/users").send(user).expect(404)
    expect(response.body.message).toBe("password needs to be 3 at minimum")
  })
  test.only('invalid user created with username length smaller than 3', async () => {
    const user = { username: "dw", password: "dah", name: "dasdas" }
    const response = await api.post("/api/users").send(user).expect(404)
    expect(response.body.message).toBe("User validation failed: username: Path `username` (`" + user.name + "`) is shorter than the minimum allowed length (3).")
  })
});

afterAll((done) => {
  mongoose.connection.close();
  done();
});
