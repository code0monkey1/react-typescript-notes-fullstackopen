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