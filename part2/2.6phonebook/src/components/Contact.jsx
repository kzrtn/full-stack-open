export const Contact = ({persons}) => persons.map(person => {
    if (person.visible) return <div key={person.name}>{person.name} {person.phone}</div>
  }
)