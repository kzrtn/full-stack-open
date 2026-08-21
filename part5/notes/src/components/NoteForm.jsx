import { useState } from "react"

const NoteForm = ({createNote}) => {
  const [newNote, setNewNote] = useState('')

  const handleNoteChange = (e) => {
    setNewNote(e.target.value)
  }

  const addNote = (e) => {
    e.preventDefault()
    createNote({
      content: newNote,
      important: true,
    })
    setNewNote('')
  }

  return (
  <form onSubmit={addNote}>
    <input value={newNote} onChange={handleNoteChange} />
    <button>save</button>
  </form>
)}

export default NoteForm