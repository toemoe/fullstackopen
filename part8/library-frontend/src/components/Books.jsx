import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ALL_GENRES } from "../queries/queries";
import { useState } from "react";

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null)

  const {data: booksData, error: booksError, loading: booksLoading } = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre }
  })
  const {data: genresData, error: genresError, loading: genresLoading } = useQuery(ALL_GENRES)
  if (booksLoading || genresLoading) return <div>loading books...</div>
  if (booksError || genresError) return <div>error loading books</div>
  const books = booksData?.allBooks || []
  const genres = genresData?.allGenres || []
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => (
        <button key={genre} onClick={() => setSelectedGenre(genre)} style={{
          fontWeight: genre === selectedGenre ? 'bold' : 'normal'
        }}>{genre}</button>
      ))}
      <button onClick={() => setSelectedGenre(null)} >all genres</button>
    </div>
  )
}

export default Books
