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

  return (
    <div>
      <Togglable buttonLabel="New blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      {orderedBlogs.map((blog) => (
        <div
          key={blog.id}
          className="pt-4 pl-2 my-2 border-solid border rounded"
        >
          <Link
            className="text-gray-600 hover:text-black"
            to={`/blogs/${blog.id}`}
          >{`${blog.title} ${blog.author}`}</Link>
        </div>
      ))}
    </div>
  )
}

export default BlogList
