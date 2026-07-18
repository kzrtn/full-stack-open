require('dotenv').config()

const Person = require('./models/person.js')
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

/*
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
*/

app.get('/api/persons', (request, response) => {
  Person.find({}).then(result => response.json(result))
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person.findById(id)
    .then(result => {
      if (result) {
        response.json(result)
      } else {
        return response.status(404).end()
      }
    })
    .catch(error => next(error))
  /*
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
  */
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  //persons = persons.filter(p => p.id !== id)

  Person.findByIdAndDelete(id)
    .then(result => {
      console.log(`Deleted person with id ${id}`)
      response.status(204).end()
    })
    .catch(error => next(error))

  //console.log(persons)
  response.status(204).end()
})

/*
const postErrorHandler = body => {
  if (!body.name) return 'name is missing'
  if (!body.number) return 'number is missing'
  if (persons.find(p => p.name === body.name)) return 'name must be unique'
  return null
}
  */


app.post('/api/persons', (request, response, next) => {
  const {name, number} = request.body
  /*
  const error = postErrorHandler(body)

  if (error) {
    return response.status(400).json({
      error: error
    })
  }
  */

  const newPerson = new Person({
    //id: crypto.randomUUID(),
    name,
    number,
    visible: true
  })

  //persons = persons.concat(newPerson)

  newPerson.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const {name, number} = request.body
  const id = request.params.id

  Person.findById(id)
    .then(result => {
      if (result) {
        result.name = name,
        result.number = number

        return result.save()
          .then(updatedPerson => {
            response.json(updatedPerson)
          })
          .catch(error => next(error))
      } else {
        return response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.get('/info', (request, response) => {
  Person.countDocuments({}).then(count => {
    //const phonebookTotal = persons.length
    const date = new Date()
    const dateString = date.toString()

    response.send(`
      <p>Phonebook has info for ${count} people</p>
      <p>${dateString}</p>`)
  })
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'})
  }
  if (error.name === 'ValidationError') {
    return response.status(400).send({error: 'name and number is required'})
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)