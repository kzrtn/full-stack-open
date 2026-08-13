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
  const myPassword = 'Password@123'
  const saltRounds = 10

  const passwordHash = await bcrypt.hash(myPassword, saltRounds)
  const user = new User({
    username: 'root',
    passwordHash
  })

  await user.save()
})

describe('when there is initially one user in db', () => {
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'johnsmith',
      name: 'John Smith',
      password: 'Password@123'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-type', /application\/json/)

    const usersAtEnd = await usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
  })

  test('creation fails with proper statuscode and message if username is taken', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'root',
      name: 'John Smith',
      password: 'Password@123'
    }

    const res = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-type', /application\/json/)

    const usersAtEnd = await usersInDb()
    assert(res.body.error.includes('expected `username` to be unique'))
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

describe('when a new user creates their account', () => {
  test.only('with a username too short fails creation', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'wa',
      name: 'wawawah',
      password: 'Password@123'
    }

    const res = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-type', /application\/json/)

    const usersAtEnd = await usersInDb()
    assert(res.body.error.includes('username too short'))
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test.only('with a username too long fails creation', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'wawwawawawawwawawawaw',
      name: 'wawawah',
      password: 'Password@123'
    }

    const res = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-type', /application\/json/)

    const usersAtEnd = await usersInDb()
    assert(res.body.error.includes('username too long'))
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test.only('with a username contains illegal characters fails', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: '@@@@',
      name: 'wawawah',
      password: 'Password@123'
    }

    const res = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-type', /application\/json/)

    const usersAtEnd = await usersInDb()
    assert(res.body.error.includes('is not a valid username'))
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test.only('with a password too short fails creation', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'wawawawa',
      name: 'wawawah',
      password: 'waw'
    }

    const res = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-type', /application\/json/)

    const usersAtEnd = await usersInDb()
    assert(res.body.error.includes('invalid password'))
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test.only('with a password without symbols fails creation', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'wawawawa',
      name: 'wawawah',
      password: 'Password123'
    }

    const res = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-type', /application\/json/)

    const usersAtEnd = await usersInDb()
    assert(res.body.error.includes('invalid password'))
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})