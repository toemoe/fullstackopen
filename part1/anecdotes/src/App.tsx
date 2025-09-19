import { useState, useEffect } from 'react'
import axios from 'axios'
import Button from './components/Button'

const App = () => {
  const [notes, setNotes] = useState<{id: number; content: string; important: boolean; }[]>([]); 
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState<number[]>([]);

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
        setVotes(Array(response.data.length).fill(0));
      })
  }, [])
  console.log('render', notes.length, 'notes');

  if (notes.length === 0) { // guard clause
    return <p>Loading...</p>
  }

  const addNote = event => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }
    axios
      .post('http://localhost:3001/notes', noteObject)
      .then(response => {
          console.log(response)
      })
  }

  const voteAnecdote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy);
  }

  const maxVotes = Math.max(...votes);
  const topAnecdote = votes.indexOf(maxVotes);

  return (
    <div>
      {notes[selected].content} <br/>
      <b>this anecdotes has {votes[selected]} votes </b><br/>
      <Button text='vote' onClick={voteAnecdote} /> 
      <Button text="next anecdote" onClick={() => setSelected(Math.floor(Math.random() * notes.length))} />

      <h2>High Votes Anecdote - {maxVotes}</h2>
      {maxVotes === 0 ? (
        <p>No votes yet</p>
      ) : (notes[topAnecdote].content)}
      
    </div>
  )
}

export default App