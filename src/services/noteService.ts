import axios from 'axios';
import { NewNote, Note } from '../types';

const BASE_URL="https://641fef8182bea25f6df72478.mockapi.io/api/v1/"

export const getAllNotes=async()=>{

    return axios.get(BASE_URL+'notes')

}

export const createNote=async(note:NewNote)=>{ 
    
  return axios.post<Note>(BASE_URL+"note",note)
}

