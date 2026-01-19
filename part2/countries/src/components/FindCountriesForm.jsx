const FindCountriesForm = ({ searchValue, handleChange }) => {
  return (
    <form>
        find countries: <input value={searchValue} onChange={handleChange} />
    </form>
  )
}

export default FindCountriesForm