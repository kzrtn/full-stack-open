import { useState } from 'react'

const BlogForm = ({ blogService }) => {
  const [blogFields, setBlogFields] = useState({
    title: '',
    author: '',
    url: ''
  })

  const submitNewBlog = e => {
    e.preventDefault()
    blogService(blogFields)
    setBlogFields({
      title: '',
      author: '',
      url: ''
    })
  }

  return (
    <div>
      <form onSubmit={submitNewBlog}>
        <div>
          <label>
            title:
            <input type="text" value={blogFields.title}
              onChange={({ target }) => setBlogFields({ ...blogFields, title: target.value })}
            />
          </label>
        </div>
        <div>
          <label>
            author:
            <input type="text" value={blogFields.author}
              onChange={({ target }) => setBlogFields({ ...blogFields, author: target.value })}
            />
          </label>
        </div>
        <div>
          <label>
            url:
            <input type="text" value={blogFields.url}
              onChange={({ target }) => setBlogFields({ ...blogFields, url: target.value })}
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm