import { ME_QUERY, ALL_BOOKS } from "../queries/queries.js"
import { useQuery } from "@apollo/client"

const RecommendGenre = () => {
  const { loading: meLoading, error: meError, data: meData } = useQuery(ME_QUERY)
  const favoriteGenre = meData?.me?.favoriteGenre

  const { loading: booksLoading, error: booksError, data: booksData } = useQuery(ALL_BOOKS, {
    skip: !favoriteGenre,
    variables: { genre: favoriteGenre },
  })

  if (meLoading || booksLoading) return <p>Loading...</p>
  if (meError || booksError) return <p>Error...</p>

  const books = booksData?.allBooks || []

  return (
    <div>
      <h2>Recommend</h2>
      <p>Books in your favorite genre: <strong>{favoriteGenre}</strong></p>
      {books.length === 0 ? (
        <p>No books in this genre</p>
      ) : (
        <ul>
          {books.map(b => (
            <li key={b.title + b.author.name}>
              {b.title} by {b.author?.name || "Unknown"} ({b.published || "Unknown"})
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default RecommendGenre
