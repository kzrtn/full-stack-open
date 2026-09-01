import { useNotes } from '../store.js'
import Note from './Note.jsx'

const NoteList = () => {
  const notes = useNotes()

  return (
    <ul>
      {notes.map(note => (
        <Note key={note.id} note={note} />
      ))}
    </ul>
  )
}

export default NoteList