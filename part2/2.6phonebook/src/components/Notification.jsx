export const Notification = ({message, isError}) => {
  let notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  if (isError) {
    notificationStyle = {
      ...notificationStyle,
      color: 'red'
    }
  }

  if (message) {
    return (
      <div style={notificationStyle}>
        {message}
      </div>
    )
  } else {
    return null
  }
}