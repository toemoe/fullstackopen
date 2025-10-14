import { useDispatch, useSelector } from "react-redux";
import { useField } from "../hooks/index";
import { setUser, clearUser } from "../reducers/userSlice";
import { showNotification } from "../reducers/notificationSlice";

const Login = () => {
  const dispatch = useDispatch();
  const username = useField("text");
  const user = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      id: Date.now(),
      name: username.inputProps.value,
      username: username.inputProps.value,
    };
    dispatch(setUser(newUser));
    dispatch(showNotification(`Hello, ${newUser.name}`, 5));
    username.reset();
  };

  const handleLogout = () => {
    dispatch(clearUser());
    dispatch(showNotification("Goodbye!", 5));
  };

  if (user) {
    return (
      <div>
        <p>
          Logged in as
          <strong> {user.name}</strong>
        </p>
        <button onClick={handleLogout}>logout</button>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Login user</h3>
        <label>
          user:
          <input {...username.inputProps} placeholder="username" />
        </label>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
