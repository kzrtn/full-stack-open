const Searchbar = ({states}) => {
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

export default Searchbar
