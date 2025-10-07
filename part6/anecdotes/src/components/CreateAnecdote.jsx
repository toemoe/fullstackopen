import { addNewAnecdote } from '../reducers/anecdoteReducer.js'
import { showNotification } from '../reducers/notificationReducer.js'
import { useDispatch } from 'react-redux'

const CreateAnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    await dispatch(addNewAnecdote(content))
    dispatch(showNotification(`you added new anecdote`, 5))
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