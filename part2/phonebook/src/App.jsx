import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = e => setNewName(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if name already exists
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const nameObject = {
      name: newName
    }
    setPersons(persons.concat(nameObject))
    setNewName('') // reset value of controlled input element
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: 
          <input 
            value={newName} 
            onChange={handleNameChange} 
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p>{person.name}</p>)}
    </div>
  )
}

export default App