import { useNotes } from './store.js'
import { useNoteActions } from './store.js'

const App = () => {
  const notes = useNotes()
  const { add } = useNoteActions()

  return (
    <div>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            {note.important ? <strong>{note.content}</strong> : note.content}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
