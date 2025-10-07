import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './filterReducer'
import anecdoteReducer, { setAnecdotes } from './anecdoteReducer'
import notificationReducer from './notificationReducer'
import anecdoteService from '../services/anecdotes'

const store = configureStore({
  reducer: {
    filter: filterReducer,
    anecdotes: anecdoteReducer,
    notification: notificationReducer
  }
})

anecdoteService.getAll().then(anecdotes => {
  store.dispatch(setAnecdotes(anecdotes))
})

export default store