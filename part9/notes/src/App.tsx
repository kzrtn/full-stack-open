import React, { useEffect, useState } from 'react';
import { type Note } from './types';
import noteService from './services/notes';

function App() {
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    noteService.getAll().then(initialNotes => setNotes(initialNotes));
  }, []);

  const noteCreation = (e: React.SyntheticEvent) => {
    e.preventDefault();
    noteService
      .create({content: newNote})
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote));
      });
    setNewNote('');
  }

  return (
    <div>
      <form onSubmit={noteCreation}>
        <input value={newNote} onChange={e => setNewNote(e.target.value)}/>
        <button>add</button>
      </form>
      <ul>
        {notes.map(note =>
          <li key={note.id}>{note.content}</li>
        )}
      </ul>
    </div>
  )
}

export default App
