const generateId = require('./utils/generateId')
const express = require('express')
const app = express()

// Middleware
app.use(express.json())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

// Data
let contacts = [
  { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
  },
  { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
  },
  { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
  },
  { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
  }
]

// Routes
app.get('/', (request, response) => {
  response.send('<h1>Welcome to the Phonebook API</h1>');
})

app.get('/info', (request, response) => {
  const totalContacts = contacts.length;
  const dateOfRequest = new Date();

  response.send(
    `<p>Phonebook has info for ${totalContacts} people<p>` +
    `<p>${dateOfRequest}<p>`
  )
})

// Fetch all contacts
app.get('/api/persons', (request, response) => {
  response.json(contacts)
})

// Fetch a single contact
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const contact = contacts.find(contact => contact.id === id)
  
  if (contact) {
    response.json(contact)
  } else {
    response.status(404).end()
  }
})

// Delete a contact
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const initialLength = contacts.length;
  contacts = contacts.filter(contact => contact.id !== id)

  if (contacts.length === initialLength) {
    // Contact to delete does not exist
    response.statusMessage = 'Contact does not exist'
    response
      .status(404)
      .json({ error: 'Contact does not exist. Unable to delete.' })
      .end()
  } else {
    response.status(204).end()
  }  
})

// POST a contact
app.post('/api/persons', (request, response) => {  
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'Name and number are required.' 
    })
  }

  // Check if name already exists
  const nameExists = contacts.some(contact => contact.name === body.name)
  
  if (nameExists) {
    return response.status(400).json({ 
      error: 'Name must be unique' 
    })
  }

  const contact = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  contacts = contacts.concat(contact)

  response.status(201).json(contact)
})

// Middleware
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// Connect to server
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})