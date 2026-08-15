const { Model, default: mongoose } = require('mongoose')

require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    minLength: [3, 'username too short'],
    maxLength: [18, 'username too long'],
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User