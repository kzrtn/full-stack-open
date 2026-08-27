import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link,
  useMatch
} from 'react-router-dom'

import blogService from './services/blogs'
import loginService from './services/login'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Dropdown from './components/Dropdown'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'


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
      setBlogs( blogs.toSorted((a, b) => b.likes - a.likes) )
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
    showNotification(NOT_ERROR, 'Successfully logged out.')
  }

  const updateBlog = async (updatedBlog) => {
    try {
      const res = await blogService.addLike(updatedBlog)
      setBlogs(blogs.map(blog =>
        blog.id === res.id ? res : blog
      ))
      showNotification(NOT_ERROR, `Liked "${updatedBlog.title}" By "${updatedBlog.author}"`)
    } catch (error) {
      showNotification(IS_ERROR, `Failed to like blog post. Error: ${error}`)
    }
  }

  const deleteBlog = async (blogToDelete) => {
    try {
      await blogService.deleteBlog(blogToDelete)
      setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
      showNotification(NOT_ERROR, `Deleted "${blogToDelete.title}" By "${blogToDelete.author}"`)
    } catch (error) {
      showNotification(IS_ERROR, `Failed to delete blog post. Error: ${error}`)
    }
  }

  const padding = {
    padding: 5
  }

  const match = useMatch('/blog/:id')
  const blog = match ? blogs.find(b => b.id === match.params.id) : null

  return (
    <>
      <div>
        <Link style={padding} to="/">blogs</Link>
        {!user && <Link style={padding} to="/login">login</Link>}
        <Link style={padding} to="/create">new blog</Link>
        {user && (
          <button onClick={logout}>logout</button>
        )}
      </div>
      <Routes>
        <Route path = "/blog/:id" element={
          <Blog
            blog={blog}
            user={user}
            updateService={updateBlog}
            deleteService={deleteBlog}
          />
        } />

        <Route path="/" element={
          <BlogList
            blogs={blogs}
            setBlogs={setBlogs}
            toast={toast}
          />
        } />

        <Route path="/login" element={
          <LoginForm
            loginService={handleLogin}
          />
        } />

        <Route path="/create" element={
          <BlogForm
            blogService={submitNewBlog}
          />
        } />
      </Routes>
    </>
  )
}

export default App