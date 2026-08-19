import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
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
      setUser(userObj)
      blogService.setToken(userObj.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      console.log('Logging in with', username, password)
      const user = await loginService.login({username, password})
      setUser(user)
      window.localStorage.setItem('BlogAppUser', JSON.stringify(user))
    } catch (error) {
      console.log(`Invalid user login. Error: ${error}`)
    }
  }

  const logout = () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('BlogAppUser')
  }

  return (
    <div>
      <h2>blogs</h2>
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
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      )}
    </div>
  )
}

export default App