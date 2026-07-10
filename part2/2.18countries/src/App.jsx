//import Search from './components/Searchbar'
import { useState } from 'react'
import axios from 'axios'

function App() {
  const [inputText, setInputText] = useState(null)
  const [countries, setCountries] = useState(null)

  if (!countries) {
    axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    .then(response => setCountries(response.data))
  }

  console.log(countries)
  return (
    <>
      <Search inputText={inputText} setInputText={setInputText} />
      <Results />
    </>
  )
}

const Search = ({inputText, setInputText}) => {
  const searchHandler = e => setInputText(e.target.value)

  return (
    <>
      find countries
      <input type="text" onChange={searchHandler}/>
    </>
  )
}

const Results = () => {
  return (
    <div>
    </div>
  )
}

export default App
