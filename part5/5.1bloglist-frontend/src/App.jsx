import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const IS_ERROR = true
const NOT_ERROR = false

const App = () => {
  const [blogs, setBlogs] = useState([])
  
  
  const [toast, setToast] = useState({
    error: null,
    message: null
  })
  const [user, setUser] = useState(null)
  

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('BlogAppUser')
    if (loggedUserJSON) {
      const userObj = JSON.parse(loggedUserJSON)
      blogService.setToken(userObj.token)
      setUser(userObj)
    }
  }, [])

  const showNotification = (isError, message) => {
    setToast({
      error: isError,
      message: message
    })

    setTimeout(() => {
      setToast({
        error: null,
        message: null
      })
    }, 5000)
  }

  const handleLogin = async (userObj) => {
    try {
      const user = await loginService.login(userObj)
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('BlogAppUser', JSON.stringify(user))
      showNotification(NOT_ERROR, `${user.name} successfully logged in.`)
    } catch (error) {
      showNotification(IS_ERROR, `Invalid credentials. Error: ${error}`)
    }
    
  }

  const submitNewBlog = async (blogFields) => {
    try {
      const res = await blogService.create(blogFields)
      setBlogs(blogs.concat(res))
      showNotification(NOT_ERROR, `Added new blog titled "${blogFields.title}" By "${blogFields.author}"`)
    } catch (error) {
      showNotification(IS_ERROR, `Failed to submit blog post. Error: ${error}`)
    }
  }

  const logout = () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('BlogAppUser')
    showNotification(NOT_ERROR, `Successfully logged out.`)
  }

  return (
    <div>
      <h2>blogs</h2>
      {toast.message && (
        <Notification toast={toast} />
      )}
      {!user && (
        <LoginForm
          loginService={handleLogin}
        />
      )}

      {user && (
        <div>
          <p>
            {user.name} is logged in.
            <button onClick={logout}>Log out</button>
          </p>

          <Togglable buttonLabel="create new blog">
            <BlogForm blogService={submitNewBlog} />
          </Togglable>
          
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      )}
    </div>
  )
}

export default App