import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

import Blog from './Blog'
import Dropdown from './Dropdown'
import Notification from './Notification'

const BlogList = ({ blogs, setBlogs, toast, user, updateBlog, deleteBlog }) => {
  return (
    <div>
      <h2>blogs</h2>
      {toast.message && (
        <Notification toast={toast} />
      )}
      <div>
        <Dropdown blogs={blogs} setBlogs={setBlogs} />
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user} blogService={updateBlog} deleteService={deleteBlog} />
        )}
      </div>
    </div>
  )
}

export default BlogList