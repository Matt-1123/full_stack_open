import axios from 'axios';
import { useEffect, useState } from 'react';

const CountryDetails = ({ country }) => {  
  const [weather, setWeather] = useState(null)
  const [weatherLoading, setWeatherLoading] = useState(true)
  const [weatherError, setWeatherError] = useState(null)
   
  const countryName = country.name.common;

  useEffect(() => {
    setWeatherLoading(true)
    setWeatherError(null)

    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${countryName}&APPID=${import.meta.env.VITE_OPENWEATHER_APIKEY}&units=metric`)
      .then(response => {
        console.log('Weather data:', response.data)
        setWeather(response.data)
        setWeatherLoading(false)
      })
      .catch(error => {
        console.error('Weather fetch error:', error)
        setWeatherError('Could not fetch weather data')
        setWeatherLoading(false)
      })
  }, [countryName])
  
  return (
    <div>
      <h2>{countryName}</h2>
      <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
      <p><strong>Area:</strong> {country.area} km<sup>2</sup></p>
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
        <p>Temperature: {weather.main.temp}<span>&deg;</span> Celcius</p>
        <img 
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
        />
        <p>Wind: {weather.wind.speed} m/s</p>
      </div>
    </div>
  )
}

export default CountryDetails