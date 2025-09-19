const { describe, test, beforeEach } = require('node:test')
const assert = require('node:assert')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

describe('User API', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({ username: 'test', name: 'Test User', passwordHash })
    await user.save()
  })

  test('GET /api/users returns users as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('POST succeeds with valid data', async () => {
    const newUser = {
      username: 'newuser',
      name: 'New User',
      password: 'secret123'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.username, newUser.username)

    const users = await User.find({})
    const usernames = users.map(u => u.username)
    assert(usernames.includes('newuser'))
  })

  test('POST fails if password is too short', async () => {
    const newUser = {
      username: 'shortpass',
      name: 'Short Pass',
      password: '1'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    assert.strictEqual(
      response.body.error,
      'username and password must be at least 3 characters long'
    )
  })

  test('POST fails if username is too short', async () => {
    const newUser = {
      username: 'ab',
      name: 'Short Username',
      password: 'validpass'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    assert.strictEqual(
      response.body.error,
      'username and password must be at least 3 characters long'
    )
  })

  test('POST fails if username is missing', async () => {
    const newUser = {
      name: 'No Username',
      password: 'validpass'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    assert.strictEqual(
      response.body.error,
      'username and password are required'
    )
  })

  test('POST fails if password is missing', async () => {
    const newUser = {
      username: 'nopass',
      name: 'No Password'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    assert.strictEqual(
      response.body.error,
      'username and password are required'
    )
  })

  test('POST fails with duplicate username', async () => {
    const newUser = {
      username: 'test',
      name: 'Duplicate User',
      password: 'anotherpass'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    assert.strictEqual(
      response.body.error,
      'expected username to be unique'
    )
  })
})