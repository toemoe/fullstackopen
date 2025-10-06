import { createStore, combineReducers } from 'redux';
import filterReducer from './filterReducer'
import anecdoteReducer from './anecdoteReducer'

const reducer = combineReducers({
  filter: filterReducer,
  anecdotes: anecdoteReducer,
})

const store = createStore(reducer)

export default store