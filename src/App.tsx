import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { Note } from './types';
import { getNextId } from './utils';

const App = () => {
  // ...
  useEffect(() => {
    axios
    .get<Note[]>('https://641fef8182bea25f6df72478.mockapi.io/api/v1/notes')
    .then(response => {
      console.log(response.data);
      setNotes(response.data);
    })
  }, [])
  // ...
  const [newNote,setNewNote] = useState('')
  const [notes,setNotes] = useState<Note[]>([{
    id:1,
    content:"Hello"
  }]);
 
 // This is a FormEvent type 
  const onFormSubmit =(event:React.FormEvent) => {

    event.preventDefault();
    
    const latestNote ={
       content:newNote,
      id:getNextId(notes.map(note => note.id))
      }

    setNotes(notes.concat(latestNote))
    
    // clear the note
    setNewNote('')

   
  }
  return (
   <div style={{padding:"2rem"}}>  
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
    </div>
  );
}

export default App;
