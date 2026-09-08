import { createRoot } from 'react-dom/client'
import { createStore } from 'redux'
import noteReducer from './reducers/noteReducer'

const store = createStore(noteReducer)

const createNote = content => ({
  type: 'NEW_NOTE',
  payload: {
    content,
    important: true,
    id: 1
  }
})

const toggleImportanceOf = id => ({
  type: 'NEW_NOTE',
  payload: {
    content: 'state changes are made with actions',
    important: false,
    id: 2
  }
})

const generateId = () => crypto.randomUUID()

const App = () => {
  const addNote = event => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.reset()
    store.dispatch(createNote(content))
  }

  const toggleImportance = id => {
    store.dispatch(toggleImportanceOf(id))
  }

  return (
    <div>
      <form onSubmit={addNote}>
        <input name="note" /> 
        <button type="submit">add</button>
      </form>
      <ul>
        {store.getState().map(note => (
          <li key={note.id} onClick={() => toggleImportance(note.id)}>
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        ))}
      </ul>
    </div>
  )
}

const root = createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)