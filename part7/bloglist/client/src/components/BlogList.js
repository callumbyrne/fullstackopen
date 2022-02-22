import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { createBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'

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

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      {orderedBlogs.map((blog) => (
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>{`${blog.title} ${blog.author}`}</Link>
        </div>
      ))}
    </div>
  )
}

export default BlogList
