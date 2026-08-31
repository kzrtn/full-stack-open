import { useNoteActions } from '../store'

const NoteForm = () => {
  const { add } = useNoteActions()
  const generateId = () => crypto.randomUUID()

  const addNote = e => {
    e.preventDefault()
    const content = e.target.note.value
    add({
      id: generateId(),
      content,
      important: false
    })
    e.target.reset()
  }

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  )
}

export default NoteForm