const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())

app.use(express.static('dist'))

morgan.token('body', req => {
  return JSON.stringify(req.body)
})


app.use(morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req,res),
      tokens.status(req,res),
      tokens.res(req,res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens.body(req)
    ].join(' ')
  })
)

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456",
      "visible": true
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523",
      "visible": true
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345",
      "visible": true
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122",
      "visible": true
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
    number: body.number,
    visible: true
  }

  persons = persons.concat(newPerson)
  response.json(newPerson)
  response.status(200).end()
})

app.get('/info', (request, response) => {
  const phonebookTotal = persons.length
  const date = new Date()
  const dateString = date.toString()

  response.send(`
    <p>Phonebook has info for ${phonebookTotal} people</p>
    <p>${dateString}</p>`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)