const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (request, response) => {
  try {
    const notes = await Note.find({})
    response.json(notes)
  } catch (error) {
    response.status(500).json({ error: error.message })
  }
})

notesRouter.get('/:id', async (request, response) => {
  try {
    const note = await Note.findById(request.params.id)
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    response.status(500).json({ error })
  }
})

notesRouter.post('/', async (request, response) => {
  const body = request.body

  try {
    const note = new Note({
      content: body.content,
      important: body.important || false,
    })

    const savedNote = await note.save()
    response.status(201).json(savedNote)
  } catch (error) {
    response.status(400).json({ error: error.message })
  }
})

notesRouter.delete('/:id', async (request, response) => {
  try {
    await Note.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    response.status(400).json({ error: error.message })
  }
})

notesRouter.put('/:id', async (request, response) => {
  const { content, important } = request.body

  try {
    const note = await Note.findById(request.params.id)

    if (!note) {
      return response.status(404).end()
    }

    note.content = content
    note.important = important

    const updatedNote = await note.save()
    response.json(updatedNote)
  } catch (error) {
    response.status(400).json({ error: error.message })
  }
})

module.exports = notesRouter
