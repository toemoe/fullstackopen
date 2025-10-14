import { useParams } from "react-router-dom";

const UserPage = ({ users = [] }) => {
  const { id } = useParams();

  const user = users.find((a) => a.id === id);
  if (!user) return <p>User not found</p>;

  return (
    <div>
      <h1>{user.name}</h1>
      <b>added blogs</b>
      <ul>
        {user.anecdotes.map((anecdote) => (
          <li key={anecdote.id}>{anecdote.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserPage;
