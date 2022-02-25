import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import Button from './Button'

const Navbar = () => {
  const currentUser = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(setUser(null))
  }

  return (
    <nav className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            {/* logo */}
            <div>
              <a
                href="#"
                className="flex items-center py-5 px-2 text-3xl text-gray-700 hover:text-gray-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
                <span className="font-bold">Blogs</span>
              </a>
            </div>
            {/* primary nav */}
            <div className="hidden md:flex items-center space-x-1 text-xl">
              <Link
                className="py-5 px-3 text-gray-600 hover:text-gray-900"
                to="/"
              >
                Blogs
              </Link>
              <Link
                className="py-5 px-3 text-gray-600 hover:text-gray-900"
                to="/users"
              >
                Users
              </Link>
            </div>
          </div>
          {/* secondary nav */}
          {currentUser ? (
            <div className="hidden md:flex items-center space-x-1 text-xl">
              <span className="py-5 px-3">{currentUser.name} logged in</span>
              <Button
                className="py-2 px-4 font-medium bg-yellow-300 hover:bg-yellow-400 rounded transition duration-200"
                action={handleLogout}
                text="Logout"
              />
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
