import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  voteAnecdoteThunk,
  deleteAnecdoteThunk,
} from "../reducers/anecdoteSlice";
import { showNotification } from "../reducers/notificationSlice";

const Anecdote = ({ anecdotes = [] }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  if (!anecdotes || anecdotes.length === 0) return <p>Loading anecdote...</p>;

  const anecdote = anecdotes.find((a) => a.id === id);
  if (!anecdote) return <p>Anecdote not found</p>;

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
    </div>
  );
};

export default Anecdote;
