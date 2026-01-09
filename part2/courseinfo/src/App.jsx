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

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Course courses={courses} />
}

export default App