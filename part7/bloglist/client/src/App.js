import React, { useEffect } from 'react'
import { Routes, Route, useMatch } from 'react-router-dom'
import blogService from './services/blogs'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import LoginForm from './components/LoginForm'
import { setUser } from './reducers/userReducer'
import BlogList from './components/BlogList'
import { initializeBlogs } from './reducers/blogReducer'
import { initalizeUsers } from './reducers/usersReducer'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import Navbar from './components/Navbar'

const App = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initalizeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const userMatch = useMatch('/users/:id')
  const user = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

  if (!currentUser) {
    return (
      <div>
        <Navbar />
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <Notification />

      <Routes>
        <Route path="/users/:id" element={<User user={user} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/blogs/:id" element={<Blog blog={blog} />} />
        <Route path="/" element={<BlogList />} />
      </Routes>
    </div>
  )
}

export default App
