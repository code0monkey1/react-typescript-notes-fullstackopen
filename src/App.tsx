
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { createNote, getAllNotes } from './services/noteService';
import { Note } from './types';
import { isArrayOfNotes } from './utils';

const App = () => {
  // ...
  useEffect(() => {
      
    const getNotes=async ()=>{
        
        try{

          const data = await getAllNotes();

          setNotes(data);

        }catch(err){

          let errorMessage="Error : " 

         if(axios.isAxiosError(err))
            errorMessage+=err.response?.data
  
           console.error(errorMessage)
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
  const onFormSubmit =async (event:React.FormEvent) => {

    event.preventDefault();

    try{
          
      const createdNote = await createNote({content:newNote}) ;
      
      setNotes(notes.concat(createdNote))
        
        // clear the note
      setNewNote('');
    }
    catch(err){
       let errorMessage="Error : "

      
       if(axios.isAxiosError(err)){

        errorMessage+=err.response?.data
       }

       console.error(errorMessage)
      
    }
     
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
