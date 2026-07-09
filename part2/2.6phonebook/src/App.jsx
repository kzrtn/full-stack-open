import { useState, useEffect } from 'react'

import personService from './services/persons'
import { PersonForm } from './components/PersonForm'
import { Contact } from './components/Contact'
import { Filter } from './components/Filter'
import { Notification } from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newNotif, setNotif] = useState({
    isError: false,
    message: null
  })

  // Load initial people from server
  useEffect(() => {
    personService
      .getAll()
      .then(initialPeople => setPersons(initialPeople))
  }, [])

  const states = {
    person: { persons, setPersons },
    name: { newName, setNewName },
    number: { newNumber, setNewNumber },
    notif: { newNotif, setNotif }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newNotif.message} isError={newNotif.isError} />
      <Filter states={states} />
      <h2>Add new number</h2>
      <PersonForm states={states} />
      <h2>Numbers</h2>
      <Contact states={states} />
    </div>
  )
}

export default App