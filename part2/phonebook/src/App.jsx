import axios from 'axios'
import { useEffect, useState } from 'react'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Search from './components/Search'
import './index.css'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterNames, setFilterNames] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
        console.error('Error deleting person: ', error);
        setErrorMessage(`Information of ${name} has already been deleted from the server`);
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
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

    // Update number (or cancel duplicate entry)
    if (existingPerson) {
      if(window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)) {
        personsService
          .update(existingPerson.id, nameObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === existingPerson.id ? returnedPerson : person
            ))
            setNewName('') 
            setNewNumber('')
            setSuccessMessage(
              `Updated ${returnedPerson.name}'s number`
            )
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
          .catch(error => {
            console.error('Error updating person: ', error)
            // Show error if contact already deleted (404 error)
            if(error.response && error.response.status === 404) {
              setErrorMessage(`Information of ${existingPerson.name} has already been deleted from the server`);
              // Clear error message after 5 seconds
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
            }
            
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
        setSuccessMessage(
          `Added ${returnedPerson.name}`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
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
      <Notification successMessage={successMessage} errorMessage={errorMessage} />
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