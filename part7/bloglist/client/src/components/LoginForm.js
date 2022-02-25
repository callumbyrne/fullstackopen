import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(setNotification(`${user.name} welcome back!`, 5))
    } catch (exception) {
      dispatch(setNotification('Wrong credentials', 5, 'error'))
    }
  }

  return (
    <div>
      <div className="text-xl font-bold pb-3">Log in to application</div>
      <form onSubmit={handleLogin}>
        <div>
          <div>Username</div>
          <input
            className="border rounded pl-2"
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <div>Password</div>
          <input
            className="border rounded pl-2"
            id="password"
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button
          className="bg-green-400  w-16 py-1 px-1 rounded mt-3 ml-0 font-medium hover:bg-green-500"
          type="submit"
          id="login"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
