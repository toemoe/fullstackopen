import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  voteAnecdoteThunk,
  deleteAnecdoteThunk,
  fetchComments,
  addNewComment,
} from "../reducers/anecdoteSlice";
import { showNotification } from "../reducers/notificationSlice";
import { useEffect } from "react";
import { useField } from "../hooks";

const Anecdote = ({ anecdotes = [] }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const comment = useField("text");

  useEffect(() => {
    dispatch(fetchComments(id));
  }, [dispatch, id]);

  if (!anecdotes || anecdotes.length === 0) return <p>Loading anecdote...</p>;

  const anecdote = anecdotes.find((a) => a.id === id);
  if (!anecdote) return <p>Anecdote not found</p>;

  const addNew = async (e) => {
    e.preventDefault();
    const newComment = comment.inputProps.value;
    dispatch(addNewComment(id, newComment));
    comment.reset();
  };

  const voteAnecdote = (anecdote) => {
    dispatch(voteAnecdoteThunk(anecdote));
  };

  const deleteAnecdote = (id) => {
    dispatch(deleteAnecdoteThunk(id));
    dispatch(showNotification(`You deleted anecdote`, 5));
    navigate("/anecdotes");
  };

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>{anecdote.author}</p>
      <p>{anecdote.info}</p>
      <p>
        <strong>has {anecdote.votes} votes</strong>
      </p>
      <button onClick={() => voteAnecdote(anecdote)}>vote</button>
      <button onClick={() => deleteAnecdote(anecdote.id)}>delete</button>
      <form onSubmit={addNew}>
      <p><b>comments</b></p>
        <ul>
        {anecdote.comments?.map((c) => (
          <li key={c.id}>{c.text}</li>
        ))}
        </ul>
        <label>
          <input {...comment.inputProps} placeholder="comment" />
        </label>
        <button type="submit">add new</button>
      </form>
    </div>
  );
};

export default Anecdote;
