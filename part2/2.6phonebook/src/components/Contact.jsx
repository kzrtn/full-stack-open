import personService from '../services/persons'

const deleteContact = (name, id, states) => {
  if(window.confirm(`Delete ${name}?`)) {
    personService
      .deleteEntry(id)
      .then(returnedData => states.setPersons(states.persons.filter(person => person.id !== id)))
  }
}

export const Contact = ({states}) => states.persons.map(person => {
  if (person.visible) {
    return (
      <div key={person.name}>
        {person.name} {person.number}
        <button onClick={() => deleteContact(person.name, person.id, states)}>delete</button>
      </div>
    )
  }
})