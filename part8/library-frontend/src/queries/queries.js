import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query allBooks($genre: String) {
  allBooks(genre: $genre) {
    title
    author {
      name
      born
      bookCount
    }
    published
  }
}
`

export const ME_QUERY = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }  
`


export const ALL_GENRES = gql`
query {
  allGenres
}
`

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      published
      author {
        name
      }
      genres
    }
  }
`

export const EDIT_BORN = gql`
  mutation editAuthor($name: String!, $born: Int) {
    editAuthor(name: $name, born: $born) {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`