import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material'
import styled from 'styled-components'

const Button1 = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const Input = styled.input`
  margin: 0.25em;
  width: 300px;  
`

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
    
    <form onSubmit={addNote}>
      <Input
        value={newNote}
        onChange={handleNoteChange}
        placeholder="write note content here"
      />
      <Button1 type="submit">save</Button1>
    </form>
  </div>
  
)}

export default NoteForm