import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const ListAnecdote = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return state.anecdotes
    } else {
      return state.anecdotes.filter(anecdote => 
        anecdote.content.includes(state.filter)
      )
    }
  })

  const vote = (id, content) => {
    dispatch(voteAnecdote({ id }))
    dispatch(setNotification(`you voted '${content}'`))
    setTimeout(() => { dispatch(clearNotification())}, 5000)
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
              <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
          </div>
      )}
    </>
  )
}

export default ListAnecdote