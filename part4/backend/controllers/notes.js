const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({})
  res.json(notes)
})

notesRouter.get('/:id', async (req, res) => {
  const returnedNote = await Note.findById(req.params.id)
  if (returnedNote) {
    res.json(returnedNote)
  } else {
    res.status(400).end()
  }
})

notesRouter.post('/', async (req, res) => {
  const body = req.body

  const note = new Note({
    content: body.content,
    important: body.important || false
  })

  const savedNote = await note.save()
  res.status(201).json(savedNote)
})

notesRouter.delete('/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

notesRouter.put('/:id', (req, res, next) => {
  const { content, important } = req.body

  Note.findByIdAndUpdate(req.params.id)
    .then(note => {
      if (!note)
        res.status(404).end()

      note.content = content
      note.important = important

      return note.save().then(updatedNote => res.json(updatedNote))
    })
    .catch(error => next(error))
})

module.exports = notesRouter