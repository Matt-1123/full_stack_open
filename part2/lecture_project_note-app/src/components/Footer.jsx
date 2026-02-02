const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic'
  }

  return (
    <div style={footerStyle}>
      <br />
      <p>
        Notes app, Department of Computer Science, University of Helsinki 2025
      </p>
      <p>The script npm run build:ui builds the frontend and copies the production version under the backend repository. The script npm run deploy releases the current backend to Render.</p>
    </div>
  )
}

export default Footer