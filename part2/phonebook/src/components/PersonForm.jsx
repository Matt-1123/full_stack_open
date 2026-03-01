const PersonForm = ({ handleSubmit, newName, handleNameChange, newNumber, handleNumberChange }) => {
  const styles = {
    input: {
      marginBottom: '0.5em'
    }
  }
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          name: 
          <input 
            style={styles.input}
            value={newName} 
            onChange={handleNameChange} 
          />
        </div>
        <div>
          number: 
          <input 
            style={styles.input}
            value={newNumber} 
            onChange={handleNumberChange} 
          />
        </div>
        <div>
          <button className='addBtn' type="submit">add</button>
        </div>
      </form>
    </>
  )
}

export default PersonForm