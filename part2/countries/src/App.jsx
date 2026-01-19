import axios from 'axios'
import { useEffect, useState } from 'react'
import CountryDetails from './components/CountryDetails'
import FindCountriesForm from './components/FindCountriesForm'
import MatchingCountry from './components/MatchingCountry'

const App = () => {
  const [searchValue, setSearchValue] = useState('')
  const [countries, setCountries] = useState([])
  const [matchingCountries, setMatchingCountries] = useState([])
  const [manuallySelectedCountry, setManuallySelectedCountry] = useState('')
  const [manuallySelectedCountryDetails, setManuallySelectedCountryDetails] = useState(null)

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

  // Show country details when 'Show' button pressed
  useEffect(() => {
    if(manuallySelectedCountry !== '') {      
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${manuallySelectedCountry}`)
        .then(response => {
          console.log(response.data)
          setManuallySelectedCountryDetails(response.data)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }, [manuallySelectedCountry])

  const handleChange = (event) => {
    setSearchValue(event.target.value)
  }

  const handleShowCountry = (name) => {
    setManuallySelectedCountry(name)
  }

  return (
    <div>
      <FindCountriesForm searchValue={searchValue} handleChange={handleChange} />
      {searchValue && matchingCountries.length > 10 && (
        <p>Too many matches. Specify another filter.</p>
      )}
      {searchValue && (matchingCountries.length < 10 && matchingCountries.length > 1) && (
        <div>
          {matchingCountries.map(country => (
            <MatchingCountry 
              key={country.cca3} 
              country={country} 
              handleShowCountry={handleShowCountry} 
            />
          ))}
        </div>
      )}
      {searchValue && matchingCountries.length === 1 && (
        <CountryDetails country={matchingCountries[0]} />
      )}
      {manuallySelectedCountry 
      && manuallySelectedCountryDetails 
      && matchingCountries.length !== 1 
      && (
        <CountryDetails country={manuallySelectedCountryDetails} />
      )}
    </div>
  )
}

export default App