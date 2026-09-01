import { create } from 'zustand'

const useNoteStore = create(set => ({
  notes: [],
  filter: 'all',
  actions: {
    add: note => set(state => ({ notes: state.notes.concat(note) })),
    toggleImportance: noteId => set(state =>
      ({ notes: state.notes.map(n => n.id === noteId ? { ...n, important: !n.important } : n)})
    ),
    setFilter: value => set(() => ({ filter: value })),
    init: notes => set(() => ({ notes }))
  }
}))

export const useNotes = () => {
  const notes = useNoteStore(state => state.notes)
  const filter = useNoteStore(state => state.filter)
  if (filter === 'important') return notes.filter(n => n.important)
  if (filter === 'nonimportant') return notes.filter(n => !n.important)
  return notes
}

export const useNoteActions = () => useNoteStore(state => state.actions)
export const useFilter = () => useNoteStore(state => state.filter)