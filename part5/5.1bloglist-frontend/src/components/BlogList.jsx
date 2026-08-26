import Dropdown from './Dropdown'
import Notification from './Notification'
import { Link } from 'react-router-dom'

const BlogList = ({ blogs, setBlogs, toast }) => {
  return (
    <div>
      <h2>blogs</h2>
      {toast.message && (
        <Notification toast={toast} />
      )}
      <div>
        <Dropdown blogs={blogs} setBlogs={setBlogs} />
        <ul>
          {blogs.map(blog =>
            <li key={blog.id}><Link to={`blog/${blog.id}`}>{blog.title}</Link></li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default BlogList