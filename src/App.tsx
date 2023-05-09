import { useState } from 'react';

import './App.css';
import { Note } from './types';

function App() {
  const [newNote,setNewNote] = useState('')
  const [notes,setNotes] = useState<Note[]>([{
    id:1,
    content:"Hello"
  }]);

  return (
    <ol style={{padding:"2rem"}} >
       {
        notes.map(note =><li key={note.id}>{note.content}</li>)
       }
    </ol>
  );
}

export default App;
