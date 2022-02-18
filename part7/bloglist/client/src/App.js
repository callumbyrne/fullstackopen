import React, { useEffect, useRef } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Button from './components/Button'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import LoginForm from './components/LoginForm'
import { setUser } from './reducers/userReducer'
import BlogList from './components/BlogList'
import { createBlog, initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
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

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
  }

  const blogFormRef = useRef()

  if (!user) {
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

      <p>
        {user.name} logged in <Button action={handleLogout} text="logout" />
      </p>

      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      <BlogList />
    </div>
  )
}

export default App
