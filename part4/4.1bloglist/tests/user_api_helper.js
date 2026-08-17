const User = require('../models/user')

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

module.exports = {
  sampleUsers,
  usersInDb
}