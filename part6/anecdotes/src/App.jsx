import CreateAnecdoteForm from './components/CreateAnecdote'
import ListAnecdote from './components/ListAnecdote'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <ListAnecdote />
      <CreateAnecdoteForm />
    </div>
  )
}

export default App