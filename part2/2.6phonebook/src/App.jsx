import { useState, useEffect } from 'react'

import personService from './services/persons'
import { PersonForm } from './components/PersonForm'
import { Contact } from './components/Contact'
import { Filter } from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  // Load initial people from server
  useEffect(() => {
    personService.getAll().then(initialPeople => setPersons(initialPeople))
  }, [])

  const states = {
    person: { persons, setPersons },
    name: { newName, setNewName },
    number: { newNumber, setNewNumber }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter states={states} />
      <h2>Add new number</h2>
      <PersonForm states={states} />
      <h2>Numbers</h2>
      <Contact persons={persons} />
    </div>
  )
}

export default App