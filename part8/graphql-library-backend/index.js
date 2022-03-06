const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
require('dotenv').config()

console.log('connecting to', process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    id: ID
    born: String
    bookCount: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: String!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: String!): Author
  }
`

// Resolvers define how GraphQL queries are responded to
const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments,
    authorCount: () => Author.collection.countDocuments,
    allAuthors: async () => await Author.find({}),
    allBooks: async (root, arg) => {
      const books = await Book.find({})

      if (arg.author && arg.genre) {
        return books.filter(
          (book) =>
            book.author === arg.author && book.genres.includes(arg.genre),
        )
      }

      if (arg.author) {
        return books.filter((book) => book.author === arg.author)
      }

      if (arg.genre) {
        return books.filter((book) => book.genres.includes(arg.genre))
      }

      return books
    },
  },

  Author: {
    bookCount: (root) =>
      books.filter((book) => book.author === root.name).length,
  },

  // In GraphQL, all operations which cause a change are done with mutations.
  Mutation: {
    addBook: async (root, args) => {
      const foundAuthor = await Author.findOne({ name: args.author })

      if (!foundAuthor) {
        const author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }

      const author = await Author.findOne({ name: args.author })
      const book = new Book({ ...args, author })
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book
    },
    editAuthor: (root, args) => {
      const author = authors.find((a) => a.name === args.name)
      if (!author) {
        return null
      }

      const updatedAuthor = { ...author, born: args.setBornTo }
      authors = authors.map((a) => (a.name === args.name ? updatedAuthor : a))
      return updatedAuthor
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
