import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '555-555-5555'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterNames, setFilterNames] = useState('')

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
    setPersons(persons.concat(nameObject))

    // reset values of controlled input element
    setNewName('') 
    setNewNumber('')
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
      Filter by name: 
      <input 
        value={filterNames}
        onChange={handleFilterNames}
      />

      <h2>Add New</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: 
          <input 
            value={newName} 
            onChange={handleNameChange} 
          />
        </div>
        <div>
          number: 
          <input 
            value={newNumber} 
            onChange={handleNumberChange} 
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {personsToShow.map(person => (
        <p key={person.name}>{person.name} {person.number}</p>
      ))}
    </div>
  )
}

export default App