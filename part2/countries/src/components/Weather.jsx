const Weather = ({ weather, temp, tempUnit, handleToggleTempUnit }) => {
  return (
    <>
        <p>
            Temperature: {temp}
            <span>&deg;</span> 
            {tempUnit === 'C' ? ' Celsius' : ' Fahrenheit'}
            <button onClick={handleToggleTempUnit} style={{ margin: '0 4px' }}>Show {tempUnit === 'C' ? ' Fahrenheit' : ' Celsius'}</button>
        </p>
        <img 
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
        />
        <p>Wind: {weather.wind.speed} m/s</p>
    </>
  )
}

export default Weather