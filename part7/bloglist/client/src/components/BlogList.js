import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = () => {
  // Can't sort the blogs directly as it would be mutating state?
  const blogs = [...useSelector((state) => state.blogs)]
  const orderedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      {orderedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default BlogList
