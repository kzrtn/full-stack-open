import Notes from './components/Notes'
import NoteForm from './components/NoteForm'
import VisibilityFilter from './components/VisibilityFilter'
import { initNotes } from './reducers/noteReducer'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initNotes())
  }, [dispatch])

  return (
    <div>
      <NoteForm />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App