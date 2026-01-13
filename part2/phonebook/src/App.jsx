import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Search from './components/Search'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterNames, setFilterNames] = useState('')

  useEffect(() => {
      personsService
        .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
    }, [])

  const handleFilterNames = e => setFilterNames(e.target.value)
  
  const handleNameChange = e => setNewName(e.target.value)

  const handleNumberChange = e => setNewNumber(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if name already exists
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const nameObject = {
      name: newName,
      number: newNumber
    }
    // setPersons(persons.concat(nameObject))

    personsService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        // reset values of controlled input element
        setNewName('') 
        setNewNumber('')
      })
  }

  // Filter persons based on the filterNames input
  const personsToShow = filterNames
    ? persons.filter(person => 
        person.name.toLowerCase().includes(filterNames.toLowerCase())
      )
    : persons  
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Search filterNames={filterNames} handleFilterNames={handleFilterNames} />

      <h2>Add New</h2>
      <PersonForm 
        handleSubmit={handleSubmit}
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} 
      />

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App