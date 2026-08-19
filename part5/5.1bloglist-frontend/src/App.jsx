import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [blogFields, setBlogFields] = useState({
    title: '',
    author: '',
    url: ''
  })

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

  const submitNewBlog = async (e) => {
    e.preventDefault()
    try {
      console.log('creating new blog post with data:', blogFields)
      const res = await blogService.create(blogFields)
      setBlogs(blogs.concat(res))
    } catch (error) {
      console.log(`Failed to submit blog post. Error: ${error}`)
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