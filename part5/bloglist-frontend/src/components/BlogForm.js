import React from "react";

const BlogForm = ({ addBlog, states, handlers }) => (
    <div>
        <h2>Create new</h2>
        <form onSubmit={addBlog}>
            <div>title: <input
                value={states.newTitle}
                onChange={handlers.handleTitleChange}
            />
            </div>
            <div>author: <input
                value={states.newAuthor}
                onChange={handlers.handleAuthorChange}
            />
            </div>
            <div>url: <input
                value={states.newUrl}
                onChange={handlers.handleUrlChange}
            />
            </div>
            <button type="submit">create</button>
        </form>
    </div>
)

export default BlogForm