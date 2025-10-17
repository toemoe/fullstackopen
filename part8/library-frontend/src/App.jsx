import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import SetBirthyear from "./components/SetBirthyear";

const App = () => {
  const [page, setPage] = useState("authors");

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("set")}>set birthyear</button>
      </div>
      { page === "authors" && <Authors show={page === "authors"} />}
      { page === "books" && <Books show={page === "books"} /> }
      { page === "add" && <NewBook show={page === "add"} /> }
      { page === "set" && <SetBirthyear show={page === "set"} /> }
    </div>
  );
};

export default App;
