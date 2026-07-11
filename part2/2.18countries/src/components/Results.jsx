import ResultsList from "./ResultsList"
import CountryDetails from "./CountryDetails"

const Results = ({states}) => {
    //Filter search results based on what's inside inputText
  const filteredCountries = states.countries && states.inputText
    ? states.countries.filter(c => c.name.common.toUpperCase().includes(states.inputText.toUpperCase()))
    : []
  
  //Too many countries to display
  if (filteredCountries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter.
      </div>
    )
  //Show list of countries that match search result
  } else if (filteredCountries.length < 10 && filteredCountries.length !== 1) {    
    return (
      <ResultsList countries={filteredCountries} />
    )

  } else if (filteredCountries.length === 1) {
    const country = filteredCountries[0]
    return <CountryDetails country={country} visible={[country.name.common]}/>
  }
}

export default Results