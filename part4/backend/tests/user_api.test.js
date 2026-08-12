const { after, beforeEach, test, describe } = require('node:test')
const assert = require('node:assert')

const bcrypt = require('bcrypt')
const supertest = require('supertest')

const User = require('../models/user')
const { usersInDb } = require('./test_helper.js')
const app = require('../app.js')
const { default: mongoose } = require('mongoose')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  const myPassword = 'sekret'
  const saltRounds = 10

  const passwordHash = await bcrypt.hash(myPassword, saltRounds)
  const user = new User({
    username: 'root',
    passwordHash
  })

  await user.save()
})

describe('when there is initially one user in db', () => {
  test.only('creation succeeds with a fresh username', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'johnsmith',
      name: 'John Smith',
      password: 'janedoe'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-type', /application\/json/)

    const usersAtEnd = await usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
  })
})

after(async () => {
  await mongoose.connection.close()
})