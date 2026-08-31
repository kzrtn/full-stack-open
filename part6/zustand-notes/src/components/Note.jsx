import { useNoteActions } from '../store'
import { useNotes } from '../store'

const Note = ({ note }) => {
  const { toggleImportance } = useNoteActions()
  const notes = useNotes()

  const handleToggle = (id) => {
    toggleImportance(id)
    console.log(notes)
  }

  return (
  <li>
    {note.important ? <strong>{note.content}</strong> : note.content}
    <button
      onClick={() => handleToggle(note.id)}
    >
      {note.important ? 'mark as unimportant' : 'mark as important'}
    </button>
  </li>
)}

export default Note