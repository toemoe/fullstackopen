import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './services/requests'
import { useNotification } from './context/NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const [notify, dispatch] = useNotification()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
  })

  const showNotification = (message) => {
    dispatch({ type: 'ADD', payload: message })
    setTimeout(() => dispatch({ type: 'REMOVE' }), 5000)
  }


  const voteAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: (error) => {
      showNotification(error.response?.data || 'Vote anecdote failed')
    }
  })
  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    showNotification('Anecdote was voted')
  }

  if (result.isLoading) return <div>Loading...</div>
  if (result.isError) return <div>Anecdote service not awailable due to  problems in server</div>

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification /> 
      
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
