import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { getAllNotes } from './services/noteService';
import { Note } from './types';
import { getNextId, isArrayOfNotes } from './utils';


const App = () => {
  // ...
  useEffect(() => {
      
    const getNotes=async ()=>{
        
        try{

          const data = await getAllNotes();

           if(!(data instanceof Array) || !isArrayOfNotes(data)) {
            throw new Error("Date received is not an array of Notes"+
            JSON.stringify(data,null,2));
          }

          setNotes(data);

        }catch(err){

          let errorMessage="Error : " 

          if(err instanceof Error){
            errorMessage+=err.message
          }

          console.error(errorMessage);
          }

    }
    getNotes();
  
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
