//import Search from './components/Searchbar'
import { useState } from 'react'
import axios from 'axios'

function App() {
  const [inputText, setInputText] = useState(null)
  const [countries, setCountries] = useState(null)

  const states = {
    inputText, setInputText,
    countries, setCountries,
  }

  if (!countries) {
    axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    .then(response => {
      setCountries(response.data.map(data => {
        return {
          ...data,
          visibility: false
        }
      }))
    })
  }

  return (
    <>
      <Search states={states} />
      <Results states={states} />
    </>
  )
}

const Search = ({states}) => {
  const inputBoxText = e => {
      states.setInputText(e.target.value)
  }
  
  return (
    <>
      find countries
      <input type="text" onChange={inputBoxText}/>
    </>
  )
}

const toggleVisibility = (states, country) => {
  states.setCountries(states.countries.map(c => 
    c.name.common === country.name.common ? {...c, visibility: !c.visibility} : c
  ))
}

const Results = ({states}) => {
  //Filter search results based on what's inside inputText
  let filteredCountries = states.countries && states.inputText
    ? states.countries.filter(c => c.name.common.toUpperCase().includes(states.inputText.toUpperCase()))
    : []

  if (filteredCountries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter.
      </div>
    )

  } else if (filteredCountries.length < 10 && filteredCountries.length !== 1) {    
    const list = filteredCountries.map(country => 
      <li key={country.name.common}>
        {country.name.common}
        <button onClick={()=>toggleVisibility(states, country)}>show</button>
        <CountryDetails country={country}/>
      </li>
    )
    return (
      <div>
        <ul>
          {list}
        </ul>
      </div>
    )

  } else if (filteredCountries.length === 1) {
    const country = { ...filteredCountries[0], visibility: true }
    return <CountryDetails country={country} />
  }
}

const CountryDetails = ({country}) => {
  if (country && country.visibility) {
    const languages = Object.values(country.languages).map(language =>
      <li key={language}>
        {language}
      </li>
    )

    return (
      <div>
        <h2>{country.name.common}</h2>
        <div>Capital: {country.capital}</div>
        <div>Area: {country.area}</div>
        <h2>Languages</h2>
        <ul>
          {languages}
        </ul>
        <img src={country.flags.png} width='200px'/>
      </div>
    )
  }
  return null
}

export default App
