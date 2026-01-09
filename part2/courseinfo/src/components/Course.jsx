const Header = ({ course }) => <h1>{course}</h1>

const Content = ({ parts }) => (
  <div>
    {parts.map(part => <Part key={part.id} part={part} /> )}
  </div>
)

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <p style={{ fontWeight: 'bold' }}>total of {totalExercises} exercises</p>
  )
}

const Course = ({ course }) => {
  const { id, name, parts } = course;
  
  return (
    <>
      <div>
        <Header course={name} />
        <Content parts={parts} />
        <Total parts={parts} />
      </div>
    </>
  )  
}

export default Course;