const { after, beforeEach, describe, test } = require('node:test')
const assert = require('node:assert')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app.js')
const User = require('../models/user.js')
const { sampleUsers, usersInDb, sendUser } = require('./user_api_helper.js')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const initialUsers = sampleUsers.map(el => {
    const saltRounds = 10
    const passwordHash = bcrypt.hashSync(el.password, saltRounds)
    
    const user = new User({
      username: el.username,
      passwordHash,
      name: el.name
    })

    return user.save()
  })

  await Promise.all(initialUsers)
})

describe('creating user with', () => {
  test.only('valid credentials succeeds with status 200', async () => {
    const testUser = {
      username: 'testuser',
      password: 'Secret?1',
      name: 'Test'
    }
    const dbAtStart = await usersInDb()
    await sendUser(testUser).expect(200)
    const dbAtEnd = await usersInDb()

    assert.strictEqual(dbAtEnd.length, dbAtStart.length + 1)
  })

  test.only('username that already exists fails with status 400', async () => {
    const testUser = {
      username: 'root',
      password: 'admin@12333',
      name: 'admin'
    }
    const dbAtStart = await usersInDb()
    await sendUser(testUser).expect(400)
    const dbAtEnd = await usersInDb()

    assert.strictEqual(dbAtEnd.length, dbAtStart.length)
  })

  test.only('too short username fails with status 400', async () => {
    const testUser = {
      username: 'j',
      password: 'Secret?1',
      name: 'John'
    }
    const dbAtStart = await usersInDb()
    await sendUser(testUser).expect(400)
    const dbAtEnd = await usersInDb()

    assert.strictEqual(dbAtEnd.length, dbAtStart.length)
  })

  test.only('no username fails with status 400', async () => {
    const testUser = {
      password: 'Secret?1',
      name: 'John'
    }
    const dbAtStart = await usersInDb()
    await sendUser(testUser).expect(400)
    const dbAtEnd = await usersInDb()

    assert.strictEqual(dbAtEnd.length, dbAtStart.length)
  })

  test.only('no name fails with status 400', async () => {
    const testUser = {
      username: 'testuser',
      password: 'Secret?1',
    }
    const dbAtStart = await usersInDb()
    await sendUser(testUser).expect(400)
    const dbAtEnd = await usersInDb()

    assert.strictEqual(dbAtEnd.length, dbAtStart.length)
  })

  test.only('no password fails with status 400', async () => {
    const testUser = {
      username: 'testuser123',
      name: 'John'
    }
    const dbAtStart = await usersInDb()
    await sendUser(testUser).expect(400)
    const dbAtEnd = await usersInDb()

    assert.strictEqual(dbAtEnd.length, dbAtStart.length)
  })

  test.only('invalid password fails with status 400', async () => {
    const testUser = {
      username: 'testuser123',
      name: 'John',
      password: 'arst'
    }
    const dbAtStart = await usersInDb()
    await sendUser(testUser).expect(400)
    const dbAtEnd = await usersInDb()

    assert.strictEqual(dbAtEnd.length, dbAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})