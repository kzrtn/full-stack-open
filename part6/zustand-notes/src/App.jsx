import { useEffect } from 'react'

import NoteForm from './components/NoteForm.jsx'
import NoteList from './components/NoteList.jsx'
import VisibilityFilter from './components/VisibilityFilter.jsx'
import noteService from './services/notes.js'
import { useNoteActions } from './store.js'

const App = () => {
  const { init } = useNoteActions()

  useEffect(() => {
    noteService.getAll().then(notes => init(notes))
  }, [init])

  return (
    <div>
      <NoteForm />
      <VisibilityFilter />
      <NoteList />
    </div>
  )
}

export default App
