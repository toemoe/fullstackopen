import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import SetBirthyear from "./components/SetBirthyear";
import LoginForm from "./components/LoginForm";
import RecommendGenre from "./components/RecommendGenre";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);

  if (!token) {
    return (
      <LoginForm setToken={setToken} />
    );
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("set")}>set birthyear</button>
        <button onClick={() => setPage("recommended")}>recommended</button>
        <button onClick={() => setToken(null)}>logout</button>
      </div>
      { page === "recommended" && <RecommendGenre />}
      { page === "authors" && <Authors show={page === "authors"} />}
      { page === "books" && <Books show={page === "books"} /> }
      { page === "add" && <NewBook show={page === "add"} /> }
      { page === "set" && <SetBirthyear show={page === "set"} /> }
    </div>
  );
};

export default App;
