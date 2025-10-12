import { Link } from "react-router-dom";

const AnecdoteList = ({ anecdotes = [] }) => {
  if (!anecdotes || anecdotes.length === 0) return <p>Loading anecdotes...</p>;

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnecdoteList;
