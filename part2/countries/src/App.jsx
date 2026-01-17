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

  // Filter countries based on search value
  const matchingCountries = countries.filter(country => {
    const searchLower = searchValue.toLowerCase()
    const commonName = country.name.common.toLowerCase()
    const officialName = country.name.official.toLowerCase()
    
    return commonName.includes(searchLower) || officialName.includes(searchLower)
  })

  return (
    <div>
      <form>
        find countries: <input value={searchValue} onChange={handleChange} />
      </form>
      {searchValue && matchingCountries.length > 10 && (
        <p>Too many matches. Specify another filter.</p>
      )}
      {searchValue && (matchingCountries.length < 10 && matchingCountries.length > 1) && (
        <div>
          {matchingCountries.map(country => (
            <div key={country.cca3}>{country.name.common}</div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App