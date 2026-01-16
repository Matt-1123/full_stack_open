const Notification = ({ successMessage, errorMessage }) => {
  if (successMessage === null && errorMessage === null) {
    return null
  }

  return (
    <div className={`notification ${successMessage !== null ? 'success' : 'error'}`}>
      {successMessage ? successMessage : errorMessage}
    </div>
  )
}

export default Notification