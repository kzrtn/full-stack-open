import { createSlice } from '@reduxjs/toolkit'
import noteService from '../services/notes'

/*
const initialState = [
  {
    content: 'reducer defines how redux store works',
    important: true,
    id: 1
  },
  {
    content: 'state of store can contain any data',
    important: false,
    id: 2
  }
]
  */

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    createNote(state, action) {
      const content = action.payload
      state.push(action.payload)
    },
    toggleImportanceOf(state, action) {
      const id = action.payload
      const noteToChange = state.find(n => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }
      return state.map(note => note.id === id ? changedNote : note)
    },
    setNotes(state, action) {
      return action.payload
    }
  }
})

const { setNotes, createNote } = noteSlice.actions
export const initNotes = () => {
  return async (dispatch) => {
    const notes = await noteService.getAll()
    dispatch(setNotes(notes))
  }
}

export const appendNote = (content) => {
  return async (dispatch) => {
    const newNote = await noteService.createNote(content)
    dispatch(createNote(newNote))
  }
}

export const { toggleImportanceOf } = noteSlice.actions
export default noteSlice.reducer