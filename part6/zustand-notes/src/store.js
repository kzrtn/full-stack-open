import { create } from 'zustand'

const useNoteStore = create(set => ({
  notes: [
    {
      id: 1,
      content: 'Zustand is less complex than redux',
      important: true
    },
  ],
  actions: {
    add: note => set(state => ({ notes: state.notes.concat(note) })),
    toggleImportance: noteId => set(state =>
      ({ notes: state.notes.map(n => n.id === noteId ? { ...n, important: !n.important } : n)})
    )
  }
}))

export const useNotes = () => useNoteStore(state => state.notes)
export const useNoteActions = () => useNoteStore(state => state.actions)