const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // ensures uniqueness of username
    minLength: [3, 'username too short'],
    maxLength: [12, 'username too long'],
    validate: {
      validator: function(v) {
        return /[a-zA-Z0-9]\w+/.test(v)
      },
      message: props => `${props.value} is not a valid username`
    }
  },
  name: String,
  passwordHash: String,
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note'
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash // the password hash should not be revealed
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User