import { useState } from 'react'
import axios from 'axios'

const CountryDetails = ({country, visible}) => {
  if (country && visible.find(c => country.name.common === c)) {
    const languages = Object.values(country.languages).map(language =>
      <li key={language}>
        {language}
      </li>
    )

    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>Capital: {country.capital}</div>
        <div>Area: {country.area}</div>
        <h2>Languages</h2>
        <ul>
          {languages}
        </ul>
        <img src={country.flags.png} width='200px'/>
        <WeatherData country={country} />
      </div>
    )
  }
  return null
}

const WeatherData = ({country}) => {
  //Data for GET request
  const api_key = import.meta.env.VITE_API_KEY
  const lat = country.latlng[0]
  const lon = country.latlng[1]

  const [weatherData, setWeatherData] = useState(null)

  if (!weatherData) {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`)
      .then(response => setWeatherData(response.data))

    return null
  }
  
  return (
    <div>
      <h2>Weather in {country.name.common}</h2>
      <div>Temperature: {weatherData.main.temp} Celsius</div>
      <img src={`https://openweathermap.org/payload/api/media/file/${weatherData.weather[0].icon}.png`} />
      <div>Wind {weatherData.wind.speed} m/s</div>
    </div>
  )

}

export default CountryDetails