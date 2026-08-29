import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import Notification from './Notification'
import LoginForm from './LoginForm'
import Togglable from './Togglable'
import noteService from '../services/notes'
import loginService from '../services/login'

const NoteList = ({ notes }) => { 
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const notesToShow = showAll ? notes : notes.filter(note => note.important == true)

  const handleLogin = async (user) => {
    try {
      const returnedUser = await loginService.login(user)
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(returnedUser))
      noteService.setToken(returnedUser.token)
      setUser(returnedUser)
    } catch (error) {
      setErrorMessage(`Invalid credentials: ${error}`)
      //Clears error message after 5 seconds
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const logout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  //const noteFormRef = useRef()

  const loginForm = () => (
    <Togglable buttonLabel="Login">
      <LoginForm
        loginUser={handleLogin}
      />
    </Togglable>
  )

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {!user && loginForm()}

      {user && (
        <div>
          <p>
          {user.name} logged in
          <button onClick={logout}>Log out</button>
          </p>
        </div>
      )}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>content</TableCell>
              <TableCell>user</TableCell>
              <TableCell>important</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notes.map(note => (
              <TableRow key={note.id}>
                <TableCell>
                  <Link to={`/notes/${note.id}`}>
                    {note.content}
                  </Link>
                </TableCell>
                <TableCell>
                  {note.user.name}
                </TableCell>
                <TableCell>
                  {note.important ? 'yes' : ''}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default NoteList