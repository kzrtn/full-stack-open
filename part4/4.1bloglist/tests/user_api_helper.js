const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const sampleUsers = [{
  username: 'root',
  password: 'admin@12333',
  name: 'admin'
},{
  username: 'john',
  password: 'Secret?1123',
  name: 'John'
}, {
  username: 'jane',
  password: 'JaneDoe#123',
  name: 'Jane Doe'
}]

const usersInDb = async () => {
  const users = await User.find()
  return users.map(user => user.toJSON())
}

const sendUser = user => {
  return api
    .post(`/api/users/`)
    .set('Content-Type', 'application/json')
    .send(user)
}

module.exports = {
  sampleUsers,
  usersInDb,
  sendUser
}