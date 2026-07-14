const express = require('express')
const app = express()
app.use(express.json())

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(p => p.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(p => p.id !== id)

  console.log(persons)
  response.status(204).end()
})

const postErrorHandler = body => {
  if (!body.name) return 'name is missing'
  if (!body.number) return 'number is missing'
  if (persons.find(p => p.name === body.name)) return 'name must be unique'
  return null
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  const error = postErrorHandler(body)

  if (error) {
    return response.status(400).json({
      error: error
    })
  }

  const newPerson = {
    id: crypto.randomUUID(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(newPerson)
  response.json(newPerson)
})

app.get('/info', (request, response) => {
  const phonebookTotal = persons.length
  const date = new Date()
  const dateString = date.toString()

  response.send(`
    <p>Phonebook has info for ${phonebookTotal} people</p>
    <p>${dateString}</p>`)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)