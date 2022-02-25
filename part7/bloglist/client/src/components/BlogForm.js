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
      url: newUrl,
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <div className="text-xl font-bold">Create new</div>
      <form onSubmit={addBlog}>
        <div>
          <div>Title</div>
          <input
            className="border rounded pl-2"
            id="title"
            value={newTitle}
            onChange={handleTitleChange}
            placeholder="title"
          />
        </div>
        <div>
          <div>Author</div>
          <input
            className="border rounded pl-2"
            id="author"
            value={newAuthor}
            onChange={handleAuthorChange}
            placeholder="author"
          />
        </div>
        <div>
          <div>Url</div>
          <input
            className="border rounded pl-2"
            id="url"
            value={newUrl}
            onChange={handleUrlChange}
            placeholder="url"
          />
        </div>
        <button
          className="bg-green-400  w-16 py-1 px-1 rounded m-1 ml-0 font-medium hover:bg-green-500"
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
