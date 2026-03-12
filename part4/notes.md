# Part 4 - Programming a server with NodeJS and Express

## Part 4a - Structure of backend application, introduction to testing
controllers/notes.js: 
```
const notesRouter = require('express').Router()
...
notesRouter.get('/:id', (request, response, next) => {
  ...
}
```

app.js: `app.use('/api/notes', notesRouter)`

A router object is an isolated instance of middleware and routes. You can think of it as a “mini-application,” capable only of performing middleware and routing functions. Every Express application has a built-in app router.

## Part 4b - Testing the backend

## Part 4c - User administration

## Part 4d - Token authentication

