import axios from 'axios'
import { useEffect, useState } from 'react'

const App = () => {
  const [searchValue, setSearchValue] = useState('')
  const [countries, setCountries] = useState([])

  // On initial render, populate state with info on all countries
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        console.log(response.data)
        setCountries(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  const handleChange = (event) => {
    setSearchValue(event.target.value)
  }

  return (
    <div>
      <form>
        find countries: <input value={searchValue} onChange={handleChange} />
      </form>
    </div>
  )
}

export default App