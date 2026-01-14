import axios from 'axios'
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

  const handleDelete = (id, name) => {
    if(window.confirm(`Delete ${name} ?`)) {
      personsService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        console.error('Error deleting person: ', error)
      })
    }
    
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameObject = {
      name: newName,
      number: newNumber
    }

    // Check if name already exists
    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      if(window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)) {
        personsService
          .update(existingPerson.id, nameObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === existingPerson.id ? returnedPerson : person
            ))
            setNewName('') 
            setNewNumber('')
          })
          .catch(error => {
            console.error('Error updating person: ', error)
          })
      } 
      return
    }

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
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App