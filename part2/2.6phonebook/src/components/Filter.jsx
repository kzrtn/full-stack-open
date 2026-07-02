export const Filter = ({states}) => {
  const inputboxFilter = (e) => {
    if (e.target.value !== '') {
      // Goes through persons array object and checks if filtered name exists
      // marks each element as visible or not based on filter
      states.person.setPersons(states.person.persons.map(person => 
        person.name.toUpperCase().includes(e.target.value.toUpperCase())
        ? {...person, visible: true}
        : {...person, visible: false}))
    } else {
      // If input box is empty, reset visibility, show all persons
      states.person.setPersons(states.person.persons.map(person => ({...person,visible: true})))
    }
  }

  return (
    <div>
      filter shown with 
      <input onChange={inputboxFilter}/>
    </div>
  )
}