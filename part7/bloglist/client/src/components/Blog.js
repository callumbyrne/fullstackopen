import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const [OP, setOP] = useState(false)
  const user = useSelector((state) => state.user)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const showWhenOP = { display: OP ? '' : 'none' }

  const dispatch = useDispatch()

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
    marginBottom: 5,
  }

  const createUpdate = () => {
    const blogObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }

    dispatch(updateBlog(blog.id, blogObject))
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} className="defaultContent">
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>

      <div style={showWhenVisible} className="togglableContent">
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>hide</button>
        <div>{blog.url}</div>
        <div>
          likes <span className="likes">{blog.likes}</span>
          <button onClick={createUpdate} className="likeButton">
            like
          </button>
        </div>
        <div>{blog.user.name}</div>
        <button
          style={showWhenOP}
          onClick={() => dispatch(deleteBlog(blog.id, blog))}
        >
          remove
        </button>
      </div>
    </div>
  )
}

export default Blog
