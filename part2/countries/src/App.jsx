import axios from 'axios'
import { useEffect, useState } from 'react'
import CountryDetails from './components/CountryDetails'

const App = () => {
  const [searchValue, setSearchValue] = useState('')
  const [countries, setCountries] = useState([])
  const [matchingCountries, setMatchingCountries] = useState([])

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

  // Update matchingCountries whenever searchValue or countries change
  useEffect(() => {
    if (!searchValue) {
      setMatchingCountries([])
      return
    }

    // Filter countries based on search value
    const filtered = countries.filter(country => {
      const searchLower = searchValue.toLowerCase()
      const commonName = country.name.common.toLowerCase()
      const officialName = country.name.official.toLowerCase()
      
      return commonName.includes(searchLower) || officialName.includes(searchLower)
    })

    setMatchingCountries(filtered)
  }, [searchValue, countries])

  const handleChange = (event) => {
    setSearchValue(event.target.value)
  }

  const handleShowCountry = () => {

  }

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
            <>
              <p key={country.cca3}>
                {country.name.common}
                <button onClick={handleShowCountry} style={{ margin: '0 4px' }}>Show</button>
              </p>
            </>
            
          ))}
        </div>
      )}
      {searchValue && matchingCountries.length === 1 && (
        <CountryDetails country={matchingCountries[0]} />
      )}
    </div>
  )
}

export default App