import { useQuery } from "@apollo/client/react"
import { useState } from "react"

import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import Notify from "./components/Notify"
import { ALL_PERSONS } from "./queries"
import PhoneForm from "./components/PhoneForm"

function App() {
  const [ errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_PERSONS, /* {
    pollInterval: 2000
  } */)

  if (result.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <>
      <Notify error_message={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </>
  )
}

export default App
