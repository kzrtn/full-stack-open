import { useState } from 'react'

const Blog = (props) => {
  const [blog, setBlog] = useState(props.blog)
  let buttonLabel = 'view'
  console.log()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visibleDetails, setVisibleDetails] = useState(false)

  const toggleDetails = () => {
    buttonLabel = !visibleDetails ? 'hide' : 'view'
    console.log(props.blog.user.id)
    console.log(props.user)
    setVisibleDetails(!visibleDetails)
  }

  const addLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    setBlog(updatedBlog)
    props.blogService(updatedBlog)
  }

  const deleteBlog = () => {
    const confirmDelete = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (confirmDelete)
      props.deleteService(blog)
  }

  return (
    <div data-testid="blog" style={blogStyle}>
      <b>{blog.title}</b> By {blog.author}
      <button onClick={toggleDetails}>{buttonLabel}</button>
      {visibleDetails && (
        <>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={addLike}>like</button>
          </div>
          <div>{blog.author}</div>
          {props.blog.user.id === props.user.id ? <button onClick={deleteBlog}>remove</button> : <></>}
        </>
      )}
    </div>
  )
}

export default Blog