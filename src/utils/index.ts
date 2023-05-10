import { Note } from "../types"

export const getNextId =(arr:number[]):number =>{
   
    return Math.max(...arr)+1

}

const isString =(str:unknown):str is string=>{
  
     return str instanceof String || typeof str === "string"

}

const isNumber =(n:unknown):n is number=>{
    
    return  !isNaN(Number(n)) 
}

const isNote=(object:unknown,type:string): object is Note =>{
   
    if(!(object instanceof Object && 'id' in object && 'content' in object && isString(object.content) && isNumber(object.id))) {  

    throw new Error(`The value of ${type} is not as expected`+JSON.stringify(object,null,2))

    }
  
    return true;
   
}

export const isArrayOfNotes =(arr:unknown[]):arr is Array<Note> =>{

     arr.forEach( (note:unknown )=> {
             
        if(!isNote(note,'note')){

                  return false;
                  
        }

     })

     return true;
}