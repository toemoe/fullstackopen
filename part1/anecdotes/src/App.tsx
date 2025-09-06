import { useState } from 'react'
import Button from './components/Button'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState<number[]>(Array(anecdotes.length).fill(0));
  const maxVotes = Math.max(...votes);
  const topAnecdote = votes.indexOf(maxVotes);

  const voteAnecdote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy);
  }

  return (
    <div>
      {anecdotes[selected]} <br/>
      <b>this anecdotes has {votes[selected]} votes </b><br/>
      <Button text='vote' onClick={voteAnecdote} /> 
      <Button text="next anecdote" onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} />

      <h2>High Votes Anecdote - {maxVotes}</h2>
      {maxVotes === 0 ? (
        <p>No votes yet</p>
      ) : (anecdotes[topAnecdote])}
      
    </div>
  )
}

export default App