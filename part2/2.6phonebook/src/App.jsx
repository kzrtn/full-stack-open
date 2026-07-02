import { useState } from 'react'

const Contact = ({persons}) => persons.map(person => <div key={person.name}>{person.name}</div>)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas'},
    { name: 'John Smith'}
  ]) 
  const [newName, setNewName] = useState('')

  const inputboxName = (e) => setNewName(e.target.value)

  const PersonAlreadyExists = (name) => {
    const filtered = persons.filter((obj) => obj.name === name)
    return filtered.length > 0 ? true : false
  }

  const addName = (e) => {
    e.preventDefault()

    if (!PersonAlreadyExists(newName)) {
      const newPerson = { name: newName }

      setPersons([
        ...persons,
        newPerson
      ])
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input onChange={inputboxName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Contact persons={persons} />
    </div>
  )
}

export default App