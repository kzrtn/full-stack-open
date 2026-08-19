import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const IS_ERROR = true
const NOT_ERROR = false

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [blogFields, setBlogFields] = useState({
    title: '',
    author: '',
    url: ''
  })
  const [password, setPassword] = useState("")
  const [toast, setToast] = useState({
    error: null,
    message: null
  })
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")

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

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({username, password})
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('BlogAppUser', JSON.stringify(user))
      showNotification(NOT_ERROR, `${user.name} successfully logged in.`)
    } catch (error) {
      showNotification(IS_ERROR, `Invalid credentials. Error: ${error}`)
    }
    setUsername('')
    setPassword('')
  }

  const submitNewBlog = async (e) => {
    e.preventDefault()
    try {
      const res = await blogService.create(blogFields)
      setBlogs(blogs.concat(res))
      showNotification(NOT_ERROR, `Added new blog titled "${blogFields.title}" By "${blogFields.author}"`)
    } catch (error) {
      showNotification(IS_ERROR, `Failed to submit blog post. Error: ${error}`)
    }
    setBlogFields({
      title: '',
      author: '',
      url: ''
    })
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
        <div>
          <form onSubmit={handleLogin}>
            <div>
              <label>
                username
                <input type="text" value={username}
                  onChange={({target}) => setUsername(target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                password
                <input type="password" value={password}
                  onChange={({target}) => setPassword(target.value)}
                />
              </label>
            </div>
            <button type="submit">Log in</button>
          </form>
        </div>
      )}

      {user && (
        <div>
          <p>
            {user.name} is logged in.
            <button onClick={logout}>Log out</button>
          </p>

          <div>
            <form onSubmit={submitNewBlog}>
              <div>
                <label>
                  title:
                  <input type="text" value={blogFields.title}
                    onChange={({target}) => setBlogFields({ ...blogFields, title: target.value })}
                  />
                </label>
              </div>
              <div>
                <label>
                  author:
                  <input type="text" value={blogFields.author}
                    onChange={({target}) => setBlogFields({ ...blogFields, author: target.value })}
                  />
                </label>
              </div>
              <div>
                <label>
                  url:
                  <input type="text" value={blogFields.url}
                    onChange={({target}) => setBlogFields({ ...blogFields, url: target.value })}
                  />
                </label>
              </div>
              <button type="submit">create</button>
            </form>
          </div>

          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      )}
    </div>
  )
}

export default App