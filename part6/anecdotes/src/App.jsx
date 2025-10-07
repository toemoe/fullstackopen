import CreateAnecdoteForm from './components/CreateAnecdote'
import ListAnecdote from './components/ListAnecdote'
import FilterAnecdotes from './components/FilterAnecdotes'
import Notification from './components/Notification'

const App = () => {
  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <FilterAnecdotes />
      <ListAnecdote />
      <CreateAnecdoteForm />
    </div>
  )
}

export default App