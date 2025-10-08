import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../services/requests.js'
import { useNotification } from '../context/NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [notify, dispatch] = useNotification()

  const showNotification = (message) => {
    dispatch({ type: 'ADD', payload: message })
    setTimeout(() => dispatch({ type: 'REMOVE' }), 5000)
  }

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      showNotification('Anecdote was created')
    },
    onError: (error) => {
      showNotification(error.response?.data || 'Create anecdote failed')
    }
  })


  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if (content.length < 5) {
      showNotification('Anecdote must be at least 5 characters long')
      event.target.anecdote.value = ''
      return
    }

    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0})
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
