const MatchingCountry = ({ country, handleShowCountry }) => {
  return (
    <p>
        {country.name.common}
        <button onClick={() => handleShowCountry(country.name.common)} style={{ margin: '0 4px' }}>Show</button>
    </p>
  )
}

export default MatchingCountry