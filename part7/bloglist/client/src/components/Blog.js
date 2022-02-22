import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateBlog, deleteBlog, createComment } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'

const Blog = ({ blog }) => {
  if (!blog) {
    return null
  }

  const [OP, setOP] = useState(false)
  const [newComment, setNewComment] = useState('')

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

  const handleCommentChange = (e) => {
    setNewComment(e.target.value)
  }

  const submitComment = (e) => {
    e.preventDefault()
    dispatch(createComment(blog.id, newComment))
    setNewComment('')
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
      <h3>comments</h3>
      <form onSubmit={submitComment}>
        <input value={newComment} onChange={handleCommentChange} />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
