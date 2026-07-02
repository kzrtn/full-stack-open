import * as DisplayComponents from "./Display"

const Courses = ({courses}) => courses.map((course) => <Course course={course} key={course.id}/>)

const Course = ({course}) => {
  return (
    <div>
      <DisplayComponents.Header courseName={course.name} />
      <DisplayComponents.Content parts={course.parts} />
      <DisplayComponents.Total parts={course.parts} />
    </div>
  )
}

export default Courses