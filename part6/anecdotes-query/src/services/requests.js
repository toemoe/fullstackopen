import axios from "axios";

export const getAnecdotes = () => 
  axios.get('http://localhost:3001/anecdotes')
  .then(res => res.data)


export const createAnecdote = newAnecdote =>
  axios.post('http://localhost:3001/anecdotes', newAnecdote)
  .then(res => res.data)

export const updateAnecdote = (anecdote) => 
  axios.put(`http://localhost:3001/anecdotes/${anecdote.id}`, anecdote)
  .then(res => res.data)
