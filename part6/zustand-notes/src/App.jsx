import NoteForm from './components/NoteForm.jsx'
import NoteList from './components/NoteList.jsx'
import VisibilityFilter from './components/VisibilityFilter.jsx'

const App = () => {
  return (
    <div>
      <NoteForm />
      <VisibilityFilter />
      <NoteList />
    </div>
  )
}

export default App
