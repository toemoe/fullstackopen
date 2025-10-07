import { createAnecdote } from '../reducers/anecdoteReducer.js'
import { useDispatch } from 'react-redux'
import { setNotification, clearNotification } from '../reducers/notificationReducer.js'

const CreateAnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(setNotification(`you added new anecdote`))
    setTimeout(() => { clearNotification() }, 5000)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default CreateAnecdoteForm