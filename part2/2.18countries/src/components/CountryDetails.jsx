const CountryDetails = ({country, visible}) => {
  if (country && visible.find(c => country.name.common === c)) {
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

export default CountryDetails