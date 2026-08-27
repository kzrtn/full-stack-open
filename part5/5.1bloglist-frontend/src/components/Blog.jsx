import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Blog = (props) => {
  const [blog, setBlog] = useState(null)
  const navigate = useNavigate()

  if (!blog && props.blog) {
    setBlog(props.blog)
  }

  if (!blog) return null

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5
  }

  const addLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    setBlog(updatedBlog)
    props.updateService(updatedBlog)
  }

  const deleteBlog = () => {
    const confirmDelete = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (confirmDelete) {
      props.deleteService(blog)
      navigate('/')
    }
  }

  const link = blog.url.includes('http') ? blog.url : `https://${blog.url}`

  const removeButton = () => {
    return (
      <>
        {
          blog.user.id === props.user.id
            ? <button onClick={deleteBlog}>remove</button>
            : <></>
        }
      </>
    )
  }

  return (
    <div data-testid="blog" style={blogStyle}>
      <b>{blog.title}</b> By {blog.author}
      <div><Link to={link}>{blog.url}</Link></div>
      <div>
        likes {blog.likes}
        <button onClick={addLike}>like</button>
      </div>
      <div>Added by {blog.user.name}</div>
      {props.user && removeButton()}
    </div>
  )
}

export default Blog