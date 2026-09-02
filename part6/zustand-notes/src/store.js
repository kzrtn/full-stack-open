import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import noteService from './services/notes.js'
/*
const logger = config => (set, get) => config(
  (...args) => {
    console.log('prev state', get())
    set(...args)
    console.log('next state', get())
  },
  get
)
*/
const useNoteStore = create(devtools((set, get) => ({
  notes: [],
  filter: 'all',
  actions: {
    add: async (note) => {
      const newNote = await noteService.createNew(note)
      set(state => ({ notes: state.notes.concat(newNote) }))
    },
    toggleImportance: async (noteId) => {
      const note = get().notes.find(n => n.id === noteId)
      const updated = await noteService.update(noteId, { ...note, important: !note.important })
      set(state => ({
        notes: state.notes.map(n => n.id === noteId ? updated : n)
      }))
    },
    setFilter: value => set(() => ({ filter: value })),
    init: async () => {
      const notes = await noteService.getAll()
      set(() => ({ notes })) 
    }
  }
})))

export const useNotes = () => {
  const notes = useNoteStore(state => state.notes)
  const filter = useNoteStore(state => state.filter)
  if (filter === 'important') return notes.filter(n => n.important)
  if (filter === 'nonimportant') return notes.filter(n => !n.important)
  return notes
}

export const useNoteActions = () => useNoteStore(state => state.actions)
export const useFilter = () => useNoteStore(state => state.filter)