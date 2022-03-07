const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
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
      published: String!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: String!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`

// Resolvers define how GraphQL queries are responded to
const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments,
    authorCount: () => Author.collection.countDocuments,
    allAuthors: async () => await Author.find({}),
    allBooks: async (root, arg) => {
      const books = await Book.find({}).populate('author')

      if (arg.author && arg.genre) {
        return books.filter(
          (book) =>
            book.author.name === arg.author && book.genres.includes(arg.genre),
        )
      }

      if (arg.author) {
        return books.filter((book) => book.author.name === arg.author)
      }

      if (arg.genre) {
        return books.filter((book) => book.genres.includes(arg.genre))
      }

      return books
    },
    me: (root, args, context) => {
      return context.currentUser
    },
  },

  Author: {
    bookCount: async (root) => {
      const foundAuthor = await Author.findOne({ name: root.name })
      const foundBooks = await Book.find({ author: foundAuthor.id })
      return foundBooks.length
    },
  },

  // In GraphQL, all operations which cause a change are done with mutations.
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      const foundAuthor = await Author.findOne({ name: args.author })

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

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
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const author = Author.findOne({ name: args.name })
      if (!author) {
        return null
      }

      author = { ...author, born: args.setBornTo }
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return author
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id).populate(
        'friends',
      )
      return { currentUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
