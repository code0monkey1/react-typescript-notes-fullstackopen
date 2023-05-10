# Notes Typescript 

> Whenever `typescript` is not able to infer the type of a value used,
> while using  `useState` , it's suggested 
> to explicitly define it .


> For example , when we create a useState , that takes in 
an empty array , it's suggested to define th type of the array explicitly : 

```javascript 
// for a sate declaration like so : 
//`const [notes, setNotes] = useState([])`
// we get the following : 

useState<never[]>(initialState: never[] | (() => never[])): 
  [never[], React.Dispatch<React.SetStateAction<never[]>>] 

```

 _TypeScript can just infer that the state has type `never[]`, it is an array but it has no clue what are the elements stored to array, so **we clearly need to help the compiler and provide the type explicitly**._

---

 #### Let us define the type for the `Notes Array`


```javascript

   interface Note {
    id: number,
    content: string
  }

  \\The solution is now simple:
  
  const [notes, setNotes] = useState<Note[]>([]);
  
  \\And indeed, the type is set quite right:
  
  useState<Note[]>(initialState: Note[] | (() => Note[])):
    [Note[], React.Dispatch<React.SetStateAction<Note[]>>]

```
 
 > So in technical terms `useState` is a _generic function_, where the type has to be specified as a type parameter in those cases when the `compiler can not infer the type`.


 #### Create new note , and add it to the `Notes Array` 
  
  > One can find all the return types for various actions over here : [React Types Cheet Sheat](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/ "react types")

 ```javascript 
    const onFormSubmit =(event:React.FormEvent) => {
  
      event.preventDefault();
      
      setNotes(notes.concat({content:newNote,
        id:getNextId(notes.map(note => note.id))}) 
      )

      // clear the note
      setNewNote('')
     
    }
```

### Using Axios with React-Typescript .

>Just like `useState` also `axios.get` is a generic function.
>
>But ,Unlike some generic functions, the type parameter of axios.get has a default value **`any`** so, if the function is used without defining the type parameter, the type of the response data will be any.
>
>Giving a type parameter to axios.get is a potentially dangerous thing to do. 
>Putting a type on an axios get function , like so:
  ```javascript
        axios
          .get<Note[]>('http://localhost:3001/notes')
          .then(response => {
                    setNotes(response.data)
                  })`
    
  ```
> Is equivalent to writing something like this :
  ```javascript
      useEffect(() => {
    axios.get('http://localhost:3001/notes').then(response => {
      // response.body is of type any
      setNotes(response.data as Note[])
    })
  }, [])
  ```

> I.E : you're explicitly asserting the type to be Note , but you don't know if what you've got is a Note type !! 
 
