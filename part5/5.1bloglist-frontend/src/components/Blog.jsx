import { useState, useRef } from "react"

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visibleDetails, setVisibleDetails] = useState(false)
  const buttonLabel = useRef('view')

  const toggleDetails = () => {
    buttonLabel.current = !visibleDetails ? 'hide' : 'view'
    setVisibleDetails(!visibleDetails)
  }

  return (
    <div style={blogStyle}>
      <b>{blog.title}</b> By {blog.author}
      <button onClick={toggleDetails}>{buttonLabel.current}</button>
      {visibleDetails && (
          <>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button>like</button>
          </div>
          <div>{blog.author}</div>
          </>
        )
      }
    </div>
  )
}

export default Blog