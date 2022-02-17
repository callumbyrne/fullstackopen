import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Button from './components/Button'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="text"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id="login">
        login
      </button>
    </form>
  )

  const blogList = () => {
    const orderedBlogs = blogs.sort((a, b) => b.likes - a.likes)

    return (
      <div>
        {orderedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            createUpdate={updateBlog}
            user={user}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    )
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))
      setSuccessMessage(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    })
  }

  const updateBlog = (id, blogObject) => {
    blogService.update(id, blogObject).then((returnedBlog) => {
      setBlogs(
        blogs.map((blog) =>
          blog.id !== returnedBlog.id ? blog : returnedBlog,
        ),
      )
    })
  }

  const handleDelete = (id, blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService.deleteItem(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
    }
  }

  const blogFormRef = useRef()

  return (
    <div>
      <Notification message={{ errorMessage, successMessage }} />
      <h2>Blogs</h2>

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} logged in <Button action={handleLogout} text="logout" />
          </p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {blogList()}
        </div>
      )}
    </div>
  )
}

export default App
