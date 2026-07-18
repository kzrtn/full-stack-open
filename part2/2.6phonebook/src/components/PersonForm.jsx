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

    if (!searchResult.length) {
      //Person's name is entirely new
      personService
        .create(newPerson)
        .then(returnedPerson => {
          states.person.setPersons(states.person.persons.concat(returnedPerson))

          //Toast notification
          states.notif.setNotif({
            isError: false,
            message: `Added ${newPerson.name}`
          })

          setTimeout(() => states.notif.setNotif({
            isError: false,
            message: null
          }), 5000)
        })
        .catch(error => {
          const errorMessage = error.response.data.error
          console.log(errorMessage)

          //Toast notification
          states.notif.setNotif({
            isError: true,
            message: `${errorMessage}`
          })

          setTimeout(() => states.notif.setNotif({
            isError: false,
            message: null
          }), 5000)
        })

    } else if (searchResult.length && hasNewNumber(searchResult[0].number, newPerson.number)) {
      //Person's name exists, but their phone number is different
      if(window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(searchResult[0].id, newPerson)
          .then(returnedPerson => {
            states.person.setPersons(
              states.person.persons.map(person =>
                person.name === returnedPerson.name ? returnedPerson : person)
            )

            // Toast notifications
            states.notif.setNotif({
              isError: false,
              message: `Updated ${newPerson.name}'s phone number`
            })

            setTimeout(() => states.notif.setNotif({
              isError: true,
              message: null
            }), 5000)
          })
          .catch(error => {
            let errorMessage

            if(!error.response) {
              errorMessage = 'Could not reach the server. Please try again'
            }
            else if (error.response.status === 404) {
              errorMessage = 'Error 404 Not Found. Person does not exist.'
              states.person.setPersons(states.person.persons.filter(person => person.name !== newPerson.name))
            }
            else if (error.response.status === 400) {
              errorMessage = error.response.data.error
            }
            else {
              errorMessage = error.response
            }
            console.log(errorMessage)

            // Toast notif
            states.notif.setNotif({
              isError: true,
              message: errorMessage
            })

            setTimeout(() => states.notif.setNotif({
              isError: true,
              message: null
            }), 5000)
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