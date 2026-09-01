import { useEffect } from 'react'
import NoteForm from './components/NoteForm.jsx'
import NoteList from './components/NoteList.jsx'
import VisibilityFilter from './components/VisibilityFilter.jsx'
import { useNoteActions } from './store.js'

const App = () => {
  const { init } = useNoteActions()
  useEffect(() => {
    init()
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
