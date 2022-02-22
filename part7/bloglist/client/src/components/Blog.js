import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'

const Blog = ({ blog }) => {
  if (!blog) {
    return null
  }

  const [OP, setOP] = useState(false)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (user.username === blog.user.username) {
      setOP(true)
    }
  }, [user, blog])

  const showWhenOP = { display: OP ? '' : 'none' }

  const likeHandler = () => {
    const blogObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }

    dispatch(updateBlog(blog.id, blogObject))
  }

  const deleteHandler = () => {
    navigate('/')
    dispatch(deleteBlog(blog.id, blog))
  }

  return (
    <div>
      <h2>{`${blog.title} ${blog.author}`}</h2>
      <div>{blog.url}</div>
      <div>
        likes <span className="likes">{blog.likes}</span>
        <button onClick={likeHandler} className="likeButton">
          like
        </button>
      </div>
      <div>added by {blog.user.name}</div>
      <button style={showWhenOP} onClick={deleteHandler}>
        remove
      </button>
    </div>
  )
}

export default Blog
