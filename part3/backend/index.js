require('dotenv').config()
const express = require('express')
const Note = require('./models/note.js')

const app = express()

app.use(express.json())
app.use(express.static('dist'))


/*
let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only Javascript",
    important: false
  },
  {
    id:"3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]
*/

app.get('/', (request, response) => {
  response.send('<h1>Hello world!</h1>')
})


app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => response.json(notes))
})


app.get('/api/notes/:id', (request, response, next) => {
  const id = request.params.id

  Note.findById(id)
    .then(note => {
      if (note) {
        note => response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      next(error)
    })
  /*
  const note = notes.find(note => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
  */
})


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'})
  }

  if (error.name === 'ValidationError') {
    return response.status(400).send({error: error.message})
  }

  next(error)
}


app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  //notes = notes.filter(note => note.id !== id)
  Note.findByIdAndDelete(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


const generateId = () => {
  const maxID = notes.length > 0
  ? Math.max(...notes.map(n => Number(n.id)))
  : 0

  return String(maxID + 1)
}


app.put('/api/notes/:id', (request, response, next) => {
  const {content, important} = request.body
  const id = request.params.id

  Note.findById(id).then(note => {
    if(!note) {
      return response.status(404).end()
    }

    note.content = content
    note.important = important

    return note.save().then((updatedNote) => {
      response.json(updatedNote)
    })
  })
  .catch(error => next(error))
})


app.post('/api/notes', (request, response, next) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = new Note ({
    content: body.content,
    important: body.important || false,
  })

  note.save()
    .then(savedNote => response.json(savedNote))
    .catch(error => next(error))
})

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)