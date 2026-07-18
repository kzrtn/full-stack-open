const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

console.log('connecting to ', url)
mongoose.connect(url, {family: 4})
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB', error.message)
  })

const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  number: {
    type: String,
    required: true
  },
  visible: Boolean
}, {toJSON: {
  transform: (_doc, ret) => {
    ret.id = ret._id,
    delete ret._id,
    delete ret.__v
  }}
})

module.exports = mongoose.model('Person', phonebookSchema)


