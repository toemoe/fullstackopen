import jwt from 'jsonwebtoken'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Author from './library-schema/author-schema.js'
import Book from './library-schema/book-schema.js'
import User from './library-schema/user-schema.js'
import { GraphQLError } from 'graphql'

dotenv.config()

mongoose.set('strictQuery', false)
const MONGODB_URI = process.env.MONGODB_URI

try {
  await mongoose.connect(MONGODB_URI)
  console.log('Connected to MongoDB')
} catch (error) {
  console.error('Error connecting to MongoDB:', error.message)
}

// ----- GRAPHQL SCHEMA -----
const typeDefs = `
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!
      born: Int
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let filter = {}
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (author) filter.author = author._id
      }
      if (args.genre) {
        filter.genres = args.genre
      }
      return Book.find(filter).populate('author')
    },
    allAuthors: async () => Author.find({}),
    me: async (root, args, context) => context.currentUser
  },

  Author: {
    bookCount: async (root) => Book.countDocuments({ author: root._id })
  },

  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Unauthorized', { extensions: { code: "UNAUTHENTICATED" } })
      }

      let author = await Author.findOne({ name: args.author })
      try {
        if (!author) {
          author = new Author({ name: args.author })
          await author.save()
        }
  
        const book = new Book({
          title: args.title,
          author: author._id,
          published: args.published,
          genres: args.genres
        })
  
        await book.save()
        return await book.populate('author')
      } catch (error) {
        throw new GraphQLError('Saving Book Failed', {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            originalError: error
          }
        })
      }
    },

    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Unauthorized', { extensions: { code: "UNAUTHENTICATED" } })
      }
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        throw new GraphQLError(`Author with name "${args.name}" not found`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name
          }
        });
      }

      try {
        author.born = args.born
        await author.save()
        return author
      } catch (error) {
        throw new GraphQLError('Saving Author Failed', {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            originalError: error
          }
        })
      }
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
      .catch(error => {
        throw new GraphQLError('Saving User Failed', {
          extensions: {code: "BAD_USER_INPUT", invalidArgs: args.username, originalError: error}
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret') {
        throw new GraphQLError('Invalid username or password', {
          extensions: { code: "BAD_USER_INPUT", invalidArgs: args.username }
        })
      }

      const token = { username: user.username, id: user._id }

      return { value: jwt.sign(token, process.env.JWT_SECRET) }
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
    return {}
  },
})

console.log(`Server ready at ${url}`)
