import { useState } from 'react'

const Contact = ({persons}) => persons.map(person => {
    if (person.visible) return <div key={person.name}>{person.name} {person.phone}</div>
  }
)

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

  const inputboxName = (e) => setNewName(e.target.value)
  const inputboxPhone = (e) => setNewPhone(e.target.value)

  const PersonAlreadyExists = (name) => {
    const filterPerson = persons.filter((obj) => obj.name === name)
    return filterPerson.length === 0
  }

  const inputboxFilter = (e) => {

    if (e.target.value !== '') {
      // Goes through persons array object and checks if filtered name exists
      // marks each element as visible or not based on filter
      setPersons(persons.map(person => 
        person.name.toUpperCase().includes(e.target.value.toUpperCase())
        ? {...person, visible: true}
        : {...person, visible: false}))
    } else {
      // If input box is empty, reset visibility, show all persons
      setPersons(persons.map(person => ({...person,visible: true})))
    }
  }

  const addName = (e) => {
    e.preventDefault()

    if (!PersonAlreadyExists) {
      const newPerson = {
        name: newName,
        phone: newPhone,
        visible: true
      }

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
      <div>
        filter shown with 
        <input onChange={inputboxFilter}/>
      </div>
      <h2>Add new number</h2>
      <form onSubmit={addName}>
        <div>
          <div>name: <input onChange={inputboxName} /></div>
          <div>number: <input onChange={inputboxPhone} /></div>
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