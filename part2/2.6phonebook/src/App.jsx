import { useState } from 'react'

import { PersonForm } from './components/PersonForm'
import { Contact } from './components/Contact'
import { Filter } from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      phone: '123456789',
      visible: true
    },
    {
      name: 'John Smith',
      phone:'987654321',
      visible: true
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
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