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

  const showWhenOP = OP ? '' : 'hidden'

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
      {/* blog */}
      <div className="pb-5 space-y-3">
        <div className="font-bold text-3xl">{`${blog.title} ${blog.author}`}</div>
        <div>{blog.url}</div>
        <div>
          Likes <span className="likes">{blog.likes}</span>
          <button
            className="bg-yellow-400 w-16 py-1 px-1 rounded m-1 ml-5 font-medium hover:bg-yellow-500"
            onClick={likeHandler}
          >
            Like
          </button>
        </div>
        <div>Added by {blog.user.name}</div>
        <button
          className={`${showWhenOP} bg-red-400 w-16 py-1 px-1 rounded m-1 ml-0 font-medium hover:bg-red-500`}
          onClick={deleteHandler}
        >
          Delete
        </button>
      </div>

      {/* comments */}
      <div>
        <div className="font-bold text-xl">Comments</div>
        <form onSubmit={submitComment}>
          <input
            className="border rounded pl-2 mr-4"
            value={newComment}
            onChange={handleCommentChange}
          />
          <button
            className="bg-green-400 py-1 px-2 rounded m-1 ml-0 font-medium hover:bg-green-500"
            type="submit"
          >
            Submit
          </button>
        </form>
        <ul>
          {blog.comments.map((comment, index) => (
            <li className="list-disc ml-8" key={index}>
              {comment}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Blog
