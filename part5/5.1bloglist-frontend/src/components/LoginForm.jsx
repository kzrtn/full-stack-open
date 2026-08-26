import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginForm = ({ loginService }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = e => {
    e.preventDefault()
    loginService({ username, password })
    navigate('/')
    setUsername('')
    setPassword('')
  }

  return(
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input type="text" value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input type="password" value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  )
}

export default LoginForm