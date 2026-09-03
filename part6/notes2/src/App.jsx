function App() {
  const addNote = async (e) => {
    e.preventDefault()
    const content = e.target.note.value
    e.target.reset()
    console.log(content)
  }

  const toggleImportance = note => {
    console.log('toggle importance of', note.id)
  }

  return (
    <div>
      <h2>Notes app</h2>
      <form on Submit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map((note) => (
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.important ? <strong>{note.content}</strong> : note.content}
          <button onClick={() => toggleImportance(note.id)}>
            {note.important ? 'make not important' : 'make important'}
          </button>
        </li>
      ))}
    </div>
  )
}

export default App
