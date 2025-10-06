import CreateAnecdoteForm from './components/CreateAnecdote'
import ListAnecdote from './components/ListAnecdote'
import FilterAnecdotes from './components/FilterAnecdotes'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <FilterAnecdotes />
      <ListAnecdote />
      <CreateAnecdoteForm />
    </div>
  )
}

export default App