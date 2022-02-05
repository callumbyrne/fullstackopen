const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// using express-async-error npm package which is required on the app.js file
// eliminates the need for try-catch blocks

// get all
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

// get one
blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

// create
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user

  if (!user.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const foundUser = await User.findById(user.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: foundUser._id
  })

  const savedBlog = await blog.save()
  foundUser.blogs = foundUser.blogs.concat(savedBlog._id)
  await foundUser.save()

  response.json(savedBlog)
})

// delete
blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user

  if (!user.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === user.id) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
})

// update
blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.content,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', { username: 1, name: 1 })
  response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter
