import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject)
    dispatch(appendBlog(newBlog))
    dispatch(
      setNotification(
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
        5,
      ),
    )
  }
}

export const updateBlog = (id, blogObject) => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    const updatedBlog = await blogService.update(id, blogObject)
    dispatch(
      setBlogs(
        blogs.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog)),
      ),
    )
  }
}

export const deleteBlog = (id, blog) => {
  return async (dispatch) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      const blogs = await blogService.getAll()
      blogService.deleteItem(id)
      dispatch(setBlogs(blogs.filter((blog) => blog.id !== id)))
    }
  }
}

export const { appendBlog, setBlogs } = blogSlice.actions
export default blogSlice.reducer
