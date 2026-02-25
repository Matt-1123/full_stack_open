require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

// ================== //
// === Middleware === //
// ================== //
app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

morgan.token('req-body', (req, res) => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))

// const requestLogger = (request, response, next) => {
//   console.log('Method:', request.method)
//   console.log('Path:  ', request.path)
//   console.log('Body:  ', request.body)
//   console.log('---')
//   next()
// }
// app.use(requestLogger)


// ====================== //
// === Route Handlers === //
// ====================== //
app.get('/api', (request, response) => {
  response.send('<h1>Welcome to the Phonebook API</h1>');
})

// app.get('/api/info', (request, response) => {
//   const totalContacts = contacts.length;
//   const dateOfRequest = new Date();

//   response.send(
//     `<p>Phonebook has info for ${totalContacts} people<p>` +
//     `<p>${dateOfRequest}<p>`
//   )
// })

// Fetch all contacts
app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(people => {
      if (people) {
        response.json(people)
      } else {
        response.status(500).json({ error: 'Failed to fetch contacts' })
      }
    })
    .catch(error => next(error))

})

// Fetch a single contact
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(contact => {
      if (contact) {
        response.json(contact)
      } else {
        response.status(404).json({ error: "Contact not found" })
      }
    })
    .catch(error => next(error))
})

// Delete a contact
app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      if (result) {
        response.status(204).end()
      } else {
        response.status(404).json({ error: 'Contact does not exist. Unable to delete.' })
      }
    })
    .catch(error => next(error))
})

// POST a contact
app.post('/api/persons', (request, response) => {
  const { name, number } = request.body

  // Input validation
  if (!name || !number) {
    return response.status(400).json({ 
      error: 'Name and number are required.' 
    })
  }

  // Check if name already exists
  // const nameExists = contacts.some(contact => contact.name === body.name)
  // if (nameExists) {
  //   return response.status(400).json({ 
  //     error: 'Name must be unique' 
  //   })
  // }

  const person = new Person({ name, number })

  person.save()
    .then(savedContact => {
      response.status(201).json(savedContact)
    })
    .catch(error => next(error))
})

// ================== //
// === Middleware === //
// ================== //

const unknownEndpoint = (request, response) => {
  response.status(404).send({ 
    error: 'unknown endpoint',
    url: `${request.protocol}://${request.get('host')}${request.originalUrl}`
  })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)


// ==================== //

// Start server - listen for incoming network connections on Render port 10000 or localhost port 3001
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})