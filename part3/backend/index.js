require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Note = require('./models/note')
const generateId = require('./utils/generateId')

const app = express()

mongoose.set('strictQuery',false)
mongoose.connect(url, { family: 4 })

app.use(express.json())
app.use(express.static('dist')) //show static content - whenever Express gets an HTTP GET request it will first check if the dist directory contains a file corresponding to the request's address. If a correct file is found, Express will return it.
app.use(cors())

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

// Fetch all notes
app.get('/api/notes', (request, response) => {  
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

// Fetch a single note
app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)
  
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

// Delete a note
app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

// POST a note
app.post('/api/notes', (request, response) => {
  // note.save().then(result => {
  //   console.log('note saved!')
  //   mongoose.connection.close()
  // })
  
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(notes),
  }

  notes = notes.concat(note)

  response.json(note)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})