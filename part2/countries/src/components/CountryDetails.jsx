import React from 'react'

const CountryDetails = ({ country }) => {
  
  
    return (
    <div>
      <h2>{country.name.common}</h2>
      <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
      <p><strong>Area:</strong> {country.area} km<sup>2</sup></p>
      <p><strong>Languages:</strong></p>
      <ul>
        {country.languages && Object.values(country.languages).map((lang, i) => (
          <li key={i}>{lang}</li>
        ))}
      </ul>
      <img 
        src={country.flags.png} 
        alt={`Flag of ${country.name.common}`}
        title={country.flags.alt}
        style={{ width: '200px', border: '1px solid #ccc' }}
      />
    </div>
  )
}

export default CountryDetails