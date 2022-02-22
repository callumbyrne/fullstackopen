import React, { useEffect } from 'react'
import { Routes, Route, useMatch, Link } from 'react-router-dom'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Button from './components/Button'
import { useDispatch, useSelector } from 'react-redux'
import LoginForm from './components/LoginForm'
import { setUser } from './reducers/userReducer'
import BlogList from './components/BlogList'
import { initializeBlogs } from './reducers/blogReducer'
import { initalizeUsers } from './reducers/usersReducer'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'

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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(setUser(null))
  }

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
        <h2>Blogs</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />

      <div style={{ backgroundColor: 'lightgrey' }}>
        <Link style={{ paddingRight: 5 }} to="/">
          blogs
        </Link>
        <Link style={{ paddingRight: 5 }} to="/users">
          users
        </Link>
        <span style={{ paddingRight: 5 }}>{currentUser.name} logged in</span>
        <Button
          style={{ paddingRight: 5 }}
          action={handleLogout}
          text="logout"
        />
      </div>

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
