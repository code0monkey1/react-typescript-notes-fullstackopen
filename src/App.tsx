import { useState } from 'react';

import './App.css';
import { Note } from './types';
import { getNextId } from './utils';

function App() {
  const [newNote,setNewNote] = useState('')
  const [notes,setNotes] = useState<Note[]>([{
    id:1,
    content:"Hello"
  }]);
 

  const onFormSubmit =(event:React.FormEvent) => {

    event.preventDefault();
    
  setNotes(notes.concat({content:newNote,
      id:getNextId(notes.map(note => note.id))}) 
    )
    // clear the note
    setNewNote('')

   
  }
  return (
   <>  
   <form onSubmit={onFormSubmit}>
        <input
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)} 
        />
        <button type='submit'>add</button>
    </form>
    <ol style={{padding:"2rem"}} >
       {
        notes.map(note =><li key={note.id}>{note.content}</li>)
       }
    </ol>
    </>
  );
}

export default App;
