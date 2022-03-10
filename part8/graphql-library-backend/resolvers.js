const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

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

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

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

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
}

module.exports = resolvers
