import axios from 'axios';
import { useEffect, useState } from 'react';

const CountryDetails = ({ country }) => {  
  const [weather, setWeather] = useState(null)
  const [weatherLoading, setWeatherLoading] = useState(true)
  const [weatherError, setWeatherError] = useState(null)
  const [tempUnit, setTempUnit] = useState('C')
  const [temp, setTemp] = useState(null)
   
  const countryName = country.name.common;

  useEffect(() => {
    setWeatherLoading(true)
    setWeatherError(null)

    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${countryName}&APPID=${import.meta.env.VITE_OPENWEATHER_APIKEY}&units=metric`)
      .then(response => {
        console.log('Weather data:', response.data)
        setWeather(response.data)
        setTemp(response.data.main.temp)
        setWeatherLoading(false)
      })
      .catch(error => {
        console.error('Weather fetch error:', error)
        setWeatherError('Could not fetch weather data')
        setWeatherLoading(false)
      })
  }, [countryName])

  useEffect(() => {
    if(!weather) return

    if(tempUnit === 'F') {
      const fahrenheit = celsiusToFahrenheit(temp);
      setTemp(fahrenheit)
    } else {
      setTemp(weather.main.temp)
    }
  }, [tempUnit])

  const celsiusToFahrenheit = (celsius) => {
    const fahrenheit = (celsius * 9/5) + 32;
    return fahrenheit;
  }

  const handleToggleTempUnit = () => {
    const unit = tempUnit === 'C' ? 'F' : 'C'
    setTempUnit(unit)
  }
  
  return (
    <div>
      <h2>{countryName}</h2>
      <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
      <p><strong>Area:</strong> {country.area.toLocaleString()} km<sup>2</sup></p>
      <h3>Languages</h3>
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
      <div>
        <h3>Weather in {countryName}</h3>
        {weatherLoading ? (
          <p>Loading...</p>
        ) : (
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
          
        )}
        
      </div>
    </div>
  )
}

export default CountryDetails