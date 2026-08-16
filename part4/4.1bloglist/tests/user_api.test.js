const { after, beforeEach, describe, test } = require('node:test')
const assert = require('node:assert')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app.js')
const User = require('../models/user.js')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
})

describe('creating user', () => {
  test.only('with valid credentials succeeds', async () => {
    const dbAtStart = await User.find()

    const testUser = {
      username: 'john',
      password: 'Secret?1',
      name: 'John'
    }

    await api
      .post(`/api/users/`)
      .set('Content-Type', 'application/json')
      .send(testUser)
      .expect(200)

    const dbAtEnd = await User.find()

    assert.strictEqual(dbAtEnd.length, dbAtStart.length + 1)
  })
})

after(async () => {
  await mongoose.connection.close()
})