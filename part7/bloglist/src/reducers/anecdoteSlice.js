import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload;
      state.push(content);
    },
    voteAnecdote(state, action) {
      return state.map((a) =>
        a.id === action.payload.id ? action.payload : a,
      );
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
    deleteAnecdote(state, action) {
      return state.filter((anecdote) => anecdote.id !== action.payload);
    },
    setComments(state, action) {
      const { id, comments } = action.payload;
      return state.map((anecdote) =>
        anecdote.id === id ? { ...anecdote, comments } : anecdote,
      );
    },
    addComment(state, action) {
      const { id, comment } = action.payload;
      return state.map((anecdote) =>
        anecdote.id === id
          ? { ...anecdote, comments: [...(anecdote.comments || []), comment] }
          : anecdote,
      );
    },
  },
});

export const {
  createAnecdote,
  voteAnecdote,
  appendAnecdote,
  setAnecdotes,
  deleteAnecdote,
  setComments,
  addComment,
} = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    console.log("Loaded anecdotes:", anecdotes);
    dispatch(setAnecdotes(anecdotes));
  };
};

export const addNewAnecdote = (content) => {
  return async (dispatch) => {
    const createdAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(createdAnecdote));
  };
};

export const voteAnecdoteThunk = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    const returnedAnecdote = await anecdoteService.update(updatedAnecdote);
    dispatch(voteAnecdote(returnedAnecdote));
  };
};

export const deleteAnecdoteThunk = (id) => {
  return async (dispatch) => {
    try {
      await anecdoteService.deleteById(id);
      dispatch(deleteAnecdote(id));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchComments = (id) => {
  return async (dispatch) => {
    const comments = await anecdoteService.getComments(id);
    dispatch(setComments({ id, comments }));
  };
};

export const addNewComment = (id, text, user) => {
  return async (dispatch) => {
    const comments = await anecdoteService.addComment(id, text, user);
    dispatch(setComments({ id, comments }));
  };
};

export default anecdoteSlice.reducer;
