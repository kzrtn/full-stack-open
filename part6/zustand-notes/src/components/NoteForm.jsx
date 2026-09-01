import { useNoteActions } from '../store'

const NoteForm = () => {
  const { add } = useNoteActions()

  const addNote = (e) => {
    e.preventDefault()
    add(e.target.note.value)
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