import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
  <form onSubmit={addNote}>
    <input
      value={newNote}
      onChange={handleNoteChange}
      placeholder='write note content here'
    />
    <button>save</button>
  </form>
)}

export default NoteForm