const NoteForm = ({addNote, newNote, handleNoteChange}) => (
  <form onSubmit={addNote}>
    <input value={newNote} onChange={handleNoteChange} />
    <button>save</button>
  </form>
)

export default NoteForm