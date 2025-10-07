import CreateAnecdoteForm from './components/CreateAnecdote'
import ListAnecdote from './components/ListAnecdote'
import FilterAnecdotes from './components/FilterAnecdotes'
import Notification from './components/Notification'
import { useEffect } from 'react'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [])

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