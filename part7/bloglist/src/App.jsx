import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import AnecdoteList from "./components/AnecdoteList";
import About from "./components/About";
import CreateNew from "./components/CreateNew";
import Anecdote from "./components/Anecdote";
import Notification from "./components/Notification";
import Login from "./components/Login";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { showNotification } from "./reducers/notificationSlice";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { addNewAnecdote, initializeAnecdotes } from "./reducers/anecdoteSlice";

const App = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);

  useEffect(() => {
    dispatch(initializeAnecdotes());
    console.log("Redux anecdotes:", anecdotes);
  }, [dispatch]);

  const addNew = (anecdote) => {
    dispatch(addNewAnecdote(anecdote));
    dispatch(showNotification(`A new anecdote ${anecdote.content} created`));
  };

  return (
    <Router>
      <div>
        <Login />
        <h1>Software anecdotes</h1>
        <Notification />
        <Menu addNew={addNew} anecdotes={anecdotes} />
        <Routes>
          <Route path="/" element={<Navigate to="/anecdotes" />} />
          <Route
            path="/anecdotes/:id"
            element={<Anecdote anecdotes={anecdotes} />}
          />
          <Route
            path="/anecdotes"
            element={<AnecdoteList anecdotes={anecdotes} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/create" element={<CreateNew addNew={addNew} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
