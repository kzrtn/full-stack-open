import { useState, useEffect } from 'react'
import noteService from './services/notes'

import {
  Routes, Route, Link,
  useMatch
} from 'react-router-dom'

import { Container } from '@mui/material'

import Home from './components/Home'
import Footer from './components/Footer'
import Note from './components/Note'
import NoteList from './components/NoteList'
import NoteForm from './components/NoteForm'
import Notification from './components/Notification'

const App = () => { 
  const [notes, setNotes] = useState([])
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const addNote = (noteObject) => {
    //noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNotification({
          text: `Note '${returnedNote.content}' added!`,
          type: 'success'
        })
        setTimeout(() => setNotification(null), 5000)
      })
  }

  const toggleImportanceOf = id => {
    //const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id === id ? returnedNote : note))
      })
      .catch(error => {
        setNotification({
          text: `Note '${note.content}' was already deleted from the server: ${error}`,
          type: 'error'
        })
          setTimeout(() => setNotification(null), 5000)
        //Updates notes array to exclude the already deleted note
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const deleteNote = async (id) => {
    await noteService.remove(id)
    setNotes(notes.filter(n => n.id !== id))
    setNotification({
      text: `Successfully deleted note.`,
      type: 'success'
    })
    setTimeout(() => setNotification(null), 5000)
  }

  const padding = {
    padding: 5
  }

  const match = useMatch('/notes/:id')
  const note = match
    ? notes.find(note => note.id === match.params.id)
    : null

  return (
    <Container>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/create">new note</Link>
      </div>
      <Notification notification={notification} />
      <Routes>
        <Route path="/notes/:id" element={
          <Note
            note={note}
            toggleImportanceOf={toggleImportanceOf}
            deleteNote={deleteNote}
          />
        } />
        <Route path="/notes" element={
          <NoteList notes={notes} setNotification={setNotification} />
        } />
        <Route path="/create" element={
          <NoteForm createNote={addNote} />
        } />
        <Route path="/" element={
          <Home />
        } />
      </Routes>
      <Footer />
    </Container>
  )
}

export default App