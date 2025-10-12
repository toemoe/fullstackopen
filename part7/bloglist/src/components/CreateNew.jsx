import { useNavigate } from "react-router-dom";
import { useField } from "../hooks/index";
import { useDispatch } from "react-redux";
import { showNotification } from "../reducers/notificationSlice";
import { addNewAnecdote } from "../reducers/anecdoteSlice.js";

const CreateNew = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAnecdote = {
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    };
    await dispatch(addNewAnecdote(newAnecdote));
    dispatch(
      showNotification(`You added new anecdote: ${newAnecdote.content}`, 5),
    );
    navigate("/anecdotes");
  };

  const handleReset = (e) => {
    e.preventDefault();
    content.reset();
    author.reset();
    info.reset();
  };

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.inputProps} />
        </div>
        <div>
          author
          <input {...author.inputProps} />
        </div>
        <div>
          url for more info
          <input {...info.inputProps} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
