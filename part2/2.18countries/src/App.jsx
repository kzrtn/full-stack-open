//import Search from './components/Searchbar'
import { useState } from 'react'
import axios from 'axios'

import Search from './components/Searchbar'
import Results from './components/Results'

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
      setCountries(response.data)
    })
  }

  return (
    <>
      <Search states={states} />
      <Results states={states} />
    </>
  )
}



export default App
