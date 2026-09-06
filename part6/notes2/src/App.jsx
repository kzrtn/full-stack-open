import { useNotes } from './hooks/useNotes'

function App() {
  const { notes, isPending,
    addNote: addNoteToServer,
    toggleImportance } = useNotes()

  
  if(isPending) {
    return (<div>loading data...</div>)
  }

  const addNote = async (e) => {
    e.preventDefault()
    const content = e.target.note.value
    e.target.reset()
    addNoteToServer(content)
  }

  return (
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name='note' />
        <button type='submit'>add</button>
      </form>
      {notes.map((note) => (
        <li key={note.id}>
          {note.important ? <strong>{note.content}</strong> : note.content}
          <button onClick={() => toggleImportance(note)}>
            {note.important ? 'make not important' : 'make important'}
          </button>
        </li>
      ))}
    </div>
  )
}

export default App
