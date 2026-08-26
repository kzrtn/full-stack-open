import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
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

  const toggleImportanceOf = id => {
    //const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        //setNotes(notes.map(note => note.id === id ? returnedNote : note))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already deleted from the server: ${error}`
        )
        //Clears error message after 5 seconds
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        //Updates notes array to exclude the already deleted note
        //setNotes(notes.filter(n => n.id !== id))
      })
  }

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
      <ul>
        {notesToShow.map(note =>
          <li key={note.id}>
            <Link to={`/notes/${note.id}`}>{note.content}</Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default NoteList