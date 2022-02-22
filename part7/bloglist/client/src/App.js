import React, { useEffect } from 'react'
import { Routes, Route, useMatch } from 'react-router-dom'
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

const App = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)

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

      <p>{currentUser.name} logged in</p>
      <Button action={handleLogout} text="logout" />

      <Routes>
        <Route path="/users/:id" element={<User user={user} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<BlogList />} />
      </Routes>
    </div>
  )
}

export default App
