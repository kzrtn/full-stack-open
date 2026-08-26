import { useState, useEffect } from 'react'
import noteService from './services/notes'

import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

import Home from './components/Home'
import Footer from './components/Footer'
import Note from './components/Note'
import NoteList from './components/NoteList'
import NoteForm from './components/NoteForm'

const App = () => { 
  const [notes, setNotes] = useState([])
  //const [errorMessage, setErrorMessage] = useState(null)

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
        setErrorMessage(
          `Note '${note.content}' was already deleted from the server: ${error}`
        )
        //Clears error message after 5 seconds
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        //Updates notes array to exclude the already deleted note
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const deleteNote = async (id) => {
    await noteService.remove(id)
    setNotes(notes.filter(n => n.id !== id))
  }

  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/create">new note</Link>
      </div>

      <Routes>
        <Route path="/notes/:id" element={
          <Note
            notes={notes}
            toggleImportanceOf={toggleImportanceOf}
            deleteNote={deleteNote}
          />
        } />
        <Route path="/notes" element={
          <NoteList notes={notes} />
        } />
        <Route path="/create" element={
          <NoteForm createNote={addNote} />
        } />
        <Route path="/" element={
          <Home />
        } />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App