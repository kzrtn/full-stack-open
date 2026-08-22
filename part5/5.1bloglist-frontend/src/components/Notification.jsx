const Notification = ({ toast }) => {
  let mystyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  if (toast.error) {
    mystyle = {
      ...mystyle,
      color: 'red'
    }
  }

  return (
    <div style={mystyle}>
      <p>{toast.message}</p>
    </div>
  )
}

export default Notification