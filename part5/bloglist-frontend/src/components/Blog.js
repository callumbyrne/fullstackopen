import React, { useState, useEffect } from 'react'

const Blog = ({ blog, createUpdate, user, handleDelete }) => {
  const [visible, setVisible] = useState(false)
  const [OP, setOP] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const showWhenOP = { display: OP ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useEffect(() => {
    if (user.username === blog.user.username) {
      setOP(true)
    }
  }, [user, blog])

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const updateBlog = () => {
    const blogObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    createUpdate(blog.id, blogObject)
  }

  const deleteBlog = () => {
    handleDelete(blog.id, blog)
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} className='defaultContent'>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>hide</button>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={updateBlog}>like</button></div>
        <div>{blog.user.name}</div>
        <button style={showWhenOP} onClick={deleteBlog}>remove</button>
      </div>
    </div>
  )
}

export default Blog