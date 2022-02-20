import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer,
    blogs: blogReducer,
    users: usersReducer,
  },
})

export default store
