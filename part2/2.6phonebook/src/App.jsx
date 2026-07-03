import { useState, useEffect } from 'react'
import axios from 'axios'

import { PersonForm } from './components/PersonForm'
import { Contact } from './components/Contact'
import { Filter } from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  })

  const states = {
    person: {
      persons: persons,
      setPersons: setPersons
    },
    name: {
      newName: newName,
      setNewName: setNewName
    },
    phone: {
      newPhone: newPhone,
      setNewPhone: setNewPhone
    }
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