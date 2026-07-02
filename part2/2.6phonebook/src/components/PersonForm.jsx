export const PersonForm = ({states}) => {
  const inputboxName = (e) => states.name.setNewName(e.target.value)
  const inputboxPhone = (e) => states.phone.setNewPhone(e.target.value)

  const PersonAlreadyExists = (name) => {
    const filterPerson = states.person.persons.filter((obj) => obj.name === name)
    return filterPerson.length > 0
  }

  const addName = (e) => {
    e.preventDefault()
    
    if (!PersonAlreadyExists(states.name.newName)) {
      const newPerson = {
        name: states.name.newName,
        phone: states.phone.newPhone,
        visible: true
      }

      states.person.setPersons([
        ...states.person.persons,
        newPerson
      ])
    } else {
      alert(`${newName} is already added to phonebook`)
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