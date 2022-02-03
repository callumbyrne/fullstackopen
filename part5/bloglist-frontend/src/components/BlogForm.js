import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  // handlers
  const handleTitleChange = (e) => {
    setNewTitle(e.target.value)
  }

  const handleAuthorChange = (e) => {
    setNewAuthor(e.target.value)
  }

  const handleUrlChange = (e) => {
    setNewUrl(e.target.value)
  }

  const addBlog = (e) => {
    e.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>title: <input
          value={newTitle}
          onChange={handleTitleChange}
        />
        </div>
        <div>author: <input
          value={newAuthor}
          onChange={handleAuthorChange}
        />
        </div>
        <div>url: <input
          value={newUrl}
          onChange={handleUrlChange}
        />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm