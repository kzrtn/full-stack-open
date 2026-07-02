export const Header = ({courseName}) => <h2>{courseName}</h2>

export const Content = ({parts}) => parts.map((part) => <Part part={part} key={part.id}/>)

export const Total = ({parts}) => {
  const total = parts.reduce((sum, current) => sum + current.exercises, 0)
  return (
    <b>total of {total} exercises</b>
  )
}

const Part = ({part}) => <p>{part.name} {part.exercises}</p>