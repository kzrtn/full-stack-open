import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Note {
  id: string,
  content: string
}

function App() {
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    axios.get('https://localhost:3001/notes')
    .then(res => {
      setNotes(res.data);
    })
  }, []);

  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      content: 'testing'
    },
  ]);

  const noteCreation = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setNotes(notes.concat({
      id: Math.random().toString(),
      content: newNote
    }));
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
