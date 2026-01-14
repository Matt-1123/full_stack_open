import Person from './Person'

const Persons = ({ personsToShow, handleDelete }) => {
  return (
    <>
        {personsToShow.map(person => (
            <Person key={person.id} name={person.name} number={person.number} handleDelete={handleDelete} id={person.id} />
        ))}
    </>
  )
}

export default Persons