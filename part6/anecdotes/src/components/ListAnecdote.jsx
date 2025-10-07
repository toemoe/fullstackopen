import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdoteThunk } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer.js'

const ListAnecdote = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    const allAnecdotes = state.anecdotes || []
    if (state.filter === '') {
      return allAnecdotes
    } else {
      return allAnecdotes.filter(anecdote => 
        anecdote.content.includes(state.filter)
      )
    }
  })

  const vote = (anecdote) => {
    dispatch(voteAnecdoteThunk(anecdote))
    dispatch(showNotification(`you voted '${anecdote.content}'`, 5))
  }

  return (
    <>
      {[...anecdotes]
        .slice()
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
      )}
    </>
  )
}

export default ListAnecdote