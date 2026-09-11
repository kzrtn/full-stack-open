import Note from './Note'

import { useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'

const Notes = () => {
  const notes = useSelector(state => {
    if (state.filter === 'ALL') {
      return state.notes
    }
    return state.filter === 'IMPORTANT'
      ? state.notes.filter(note => note.important)
      : state.notes.filter(note => !note.important)
  })
  

  if (!notes) {
    return (
      <div>loading...</div>
    )
  }
  
  const toggleImportance = id => dispatch(toggleImportanceOf(id))

  return (
    <ul>
      {notes.map(note => (
        <Note
          note={note}
          key={note.id}
          handleClick={() => toggleImportance(note.id)}
        />
      ))}
    </ul>
  )
}

export default Notes