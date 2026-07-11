import { useState } from "react"
import CountryDetails from "./CountryDetails"

const toggleVisibility = (visible, setVisible, countryName) => {
  //If country is not in the visible list, add to visible array
  if (!visible.find(c => c === countryName)) {
    setVisible([...visible, countryName])
  //Else remove it
  } else {
    setVisible(visible.filter(c => c !== countryName))
  }
}

const List = ({countries}) => {
  const [visible, setVisible] = useState([])

  const list = countries.map(country => 
    <li key={country.name.common}>
      {country.name.common}
      <button onClick={() => toggleVisibility(visible, setVisible, country.name.common)}>show</button>
      <CountryDetails country={country} visible={visible}/>
    </li>
  )
  return (
    <div>
      <ul>
        {list}
      </ul>
    </div>
  )
}

export default List