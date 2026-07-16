const mongoose = require('mongoose')

if (process.argv.length < 3 || process.argv.length === 4) {
  console.log(`Not enough arguments, to add new contact please write 'node mongo.js (your pasword) "(contact name)" (contact number)`)
  console.log('To display all entries in phonebook, use node mongo.js (your password)')
  process.exit
}

const password = process.argv[2]

const url = `mongodb+srv://admin:${password}@cluster0.pofrwtm.mongodb.net/phonebookApp?appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4})

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
  visible: Boolean
})

const Person = mongoose.model('Person', phonebookSchema)

if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
    visible: true
  })

  person.save().then(result => {
    console.log(`added ${person.name}, number ${person.number} to phonebook`)
    mongoose.connection.close()
  })
} else if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(person => console.log(person))
  }).then(() => mongoose.connection.close())
}
