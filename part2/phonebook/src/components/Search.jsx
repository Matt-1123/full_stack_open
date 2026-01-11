const Search = ({ filterNames, handleFilterNames }) => {
  return (
    <>
        Filter by name: 
        <input 
            value={filterNames}
            onChange={handleFilterNames}
        />
    </>
  )
}

export default Search