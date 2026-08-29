import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material'

const NoteForm = ({createNote}) => {
  const [newNote, setNewNote] = useState('')
  const navigate = useNavigate()

  const handleNoteChange = (e) => {
    setNewNote(e.target.value)
  }

  const addNote = (e) => {
    e.preventDefault()
    createNote({
      content: newNote,
      important: true,
    })

    navigate('/notes')
    setNewNote('')
  }

  return (
  <div>
    <h2>
      Create a new note
    </h2>
    <form onSubmit={addNote}>
      <TextField
        label="note content"
        value={newNote}
        onChange={handleNoteChange}
      />
      <div>
        <Button type="submit" variant="contained" style={{marginTop: 10}}>
          save
        </Button>
      </div>
    </form>
  </div>
  
)}

export default NoteForm