import axios from 'axios';
import { NewNote } from '../types';

const BASE_URL="https://641fef8182bea25f6df72478.mockapi.io/api/v1/"

export const getAllNotes=()=>{

    return axios.get(BASE_URL+'notes').then(res=>res.data)
}

export const createNote=(note:NewNote)=>{ 
    
  return axios.post(BASE_URL+"note",note).then(res=>res.data)
}

