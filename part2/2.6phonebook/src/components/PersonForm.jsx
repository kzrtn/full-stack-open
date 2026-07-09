import personService from '../services/persons'

export const PersonForm = ({states}) => {
  const inputboxName = e => states.name.setNewName(e.target.value)
  const inputboxPhone = e => states.number.setNewNumber(e.target.value)

  const searchForPerson = name => states.person.persons.filter((obj) => obj.name === name)
  const hasNewNumber = (oldNumber, newNumber) => newNumber != oldNumber

  const addName = e => {
    e.preventDefault()
   
    const newPerson = {
      name: states.name.newName,
      number: states.number.newNumber,
      visible: true
    }

    const searchResult = searchForPerson(newPerson.name)
    const isNewNumber = hasNewNumber(searchResult[0].number, newPerson.number)

    if (!searchResult.length) {
      //Person's name is entirely new
      personService
        .create(newPerson)
        .then(returnedPerson => {
          states.person.setPersons(states.person.persons.concat(returnedPerson))
        })
    } else if (searchResult.length && isNewNumber) {
      //Person's name exists, but their phone number is different
      if(window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(searchResult[0].id, newPerson)
          .then(returnedPerson => {
            states.person.setPersons(
              states.person.persons.map(person =>
                person.name === returnedPerson.name ? returnedPerson : person)
            )
          })
      }
    } else if (searchResult.length) {
      //Person's name and their phone number exists
      alert(`${states.name.newName} is already added to phonebook`)
    }
  }
  
  return (
    <form onSubmit={addName}>
      <div>
        <div>name: <input onChange={inputboxName} /></div>
        <div>number: <input onChange={inputboxPhone} /></div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}