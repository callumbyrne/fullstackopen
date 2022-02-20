import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { createBlog } from '../reducers/blogReducer'

const BlogList = () => {
  // Can't sort the blogs directly as it would be mutating state?
  const blogs = [...useSelector((state) => state.blogs)]
  const orderedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  const dispatch = useDispatch()

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
  }

  const blogFormRef = useRef()

  return (
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      <div>
        {orderedBlogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  )
}

export default BlogList
