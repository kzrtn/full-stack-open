import personService from '../services/persons'

const deleteContact = (name, id, states) => {
  if(window.confirm(`Delete ${name}?`)) {
    personService
      .deleteEntry(id)
      .then(returnedData => states.person.setPersons(states.person.persons.filter(person => person.id !== returnedData.id)))
      // In the event that we're trying to delete someone who doesn't exist
      .catch(error => {
        console.log('Error deleting person, they are already deleted.', error)
        states.notif.setNotif({
          isError: true,
          message: `Information of ${name} has already been removed from server`
        })

        setTimeout(() => states.notif.setNotif({
          isError: true,
          message: null
        }), 5000)

        states.person.setPersons(states.person.persons.filter(person => person.name != name))
      })
  }
}

export const Contact = ({states}) => states.person.persons.map(person => {
    return (
      <div key={person.name}>
        {person.name} {person.number}
        <button onClick={() => deleteContact(person.name, person.id, states)}>delete</button>
      </div>
    )
})