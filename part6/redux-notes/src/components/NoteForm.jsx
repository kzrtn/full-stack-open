import { createNote } from '../reducers/noteReducer'
import { useDispatch } from 'react-redux'
import noteService from '../services/notes'

const NoteForm = () => {
  const dispatch = useDispatch()
  
  const addNote = event => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.reset()
    noteService.createNote(content).then(note => dispatch(createNote(note)))
  }

  return(
    <form onSubmit={addNote}>
      <input name="note" /> 
      <button type="submit">add</button>
    </form>
  )
}

export default NoteForm