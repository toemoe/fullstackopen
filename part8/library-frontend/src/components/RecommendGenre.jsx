import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ME_QUERY } from "../queries/queries.js";

const RecommendGenre = () => {
  const { data: userData, loading: userLoading, error: userError } = useQuery(ME_QUERY);

  const favoriteGenre = userData?.me?.favoriteGenre;
  console.log(favoriteGenre)
  const { loading, data, error } = useQuery(ALL_BOOKS, {
    skip: !favoriteGenre,
    variables: { genre: favoriteGenre },
  });

  if (userLoading) return <div>Loading user data...</div>;
  if (userError) return <div>Error loading user: {userError.message}</div>;

  if (!favoriteGenre) {
    return <div>No recommendations to show. You do not have a favorite genre</div>;
  }

  if (loading) return <div>Loading recommendations...</div>;
  if (error) return <div>Error loading recommended books: {error.message}</div>;

  return (
    <div>
      <h2>Recommendations</h2>
      {data.allBooks.length === 0 ? (
        <p>No books in your favorite genre <b>{favoriteGenre}</b></p>
      ) : (
        <>
          <p>Books in your favorite genre <b>{favoriteGenre}</b></p>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Published</th>
              </tr>
            </thead>
            <tbody>
              {data.allBooks.map(book => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author?.name || "Unknown"}</td>
                  <td>{book.published || "Unknown"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default RecommendGenre;