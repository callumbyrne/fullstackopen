import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
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

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

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

      <p>{user.name} logged in</p>
      <Button action={handleLogout} text="logout" />

      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<BlogList />} />
      </Routes>
    </div>
  )
}

export default App
