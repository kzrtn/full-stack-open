const { after, beforeEach, describe, test } = require('node:test')
const assert = require('node:assert')
const bcrypt = require('bcrypt')
const supertest = require('supertest')

const app = require('../app.js')
const { default: mongoose } = require('mongoose')

const api = supertest(app)

beforeEach(async () => {
  //delete users later
})

describe('creating user', () => {
  test.only('with valid credentials succeeds', async () => {
    const testData = {
      username: 'john',
      password: 'Secret?1',
      name: 'John'
    }

    await api
      .post(`/api/users/`)
      .set('Content-Type', 'application/json')
      .send(testData)
      .expect(200)
  })
})

after(async () => {
  await mongoose.connection.close()
})