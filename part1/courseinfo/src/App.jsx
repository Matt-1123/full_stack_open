const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part info={props.parts[0]} />
      <Part info={props.parts[1]} />
      <Part info={props.parts[2]} />
    </div>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.info.name} {props.info.exercises}</p>
    </>
  )
}

const Total = (props) => {
  let total = 0;
  props.parts.map(part => {
    total += part.exercises;
  })
  
  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App