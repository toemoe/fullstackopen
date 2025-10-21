import { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import SetBirthyear from "./components/SetBirthyear";
import LoginForm from "./components/LoginForm";
import RecommendGenre from "./components/RecommendGenre";
import { ME_QUERY } from "./queries/queries";
import { useQuery } from "@apollo/client";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null)
  const { loading, error, data } = useQuery(ME_QUERY, {
    skip: !token
  });

  useEffect(() => {
    const savedToken = localStorage.getItem("library-user-token");
    if (savedToken) setToken(savedToken);
  }, []);
  
  if (loading) return <div>Loading user data...</div>;
  if (error) return <div>Failed to load user info</div>;
  
  const favoriteGenre = data?.me?.favoriteGenre;

  if (!token) {
    return (
      <LoginForm
        setToken={(t) => {
          setToken(t);
          localStorage.setItem("library-user-token", t);
        }}
      />
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
        <button
          onClick={() => {
            setToken(null);
            localStorage.removeItem("library-user-token");
            setPage("authors");
          }}
        >
          logout
        </button>
      </div>

      {page === "recommended" && <RecommendGenre favoriteGenre={favoriteGenre}/>}
      {page === "authors" && <Authors show={page === "authors"} />}
      {page === "books" && <Books show={page === "books"} selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />}
      {page === "add" && <NewBook show={page === "add"} selectedGenre={selectedGenre} />}
      {page === "set" && <SetBirthyear show={page === "set"} />}
    </div>
  );
};

export default App;