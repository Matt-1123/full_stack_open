# Part 4 - Programming a server with NodeJS and Express

## Part 4a - Structure of backend application, introduction to testing

### Project Structure

>The event handlers of routes are commonly referred to as controllers, and for this reason we have created a new controllers directory. 

controllers/notes.js: 
```
const notesRouter = require('express').Router()
...
notesRouter.get('/:id', (request, response, next) => {
  ...
}
```

>The module exports the router to be available for all consumers of the module, e.g.:

app.js: `app.use('/api/notes', notesRouter)`

A router object is an isolated instance of middleware and routes. You can think of it as a “mini-application,” capable only of performing middleware and routing functions. Every Express application has a built-in app router.

### Note on Exports

```
const info = (...params) => {
  console.log(...params)
}

const error = (...params) => {
  console.error(...params)
}


module.exports = { info, error }
```

The config module file exports an object that has two fields, both of which are functions. The functions can be used in two different ways. The first option is to require the whole object and refer to functions through the object using the dot notation:

```
const logger = require('./utils/logger')

logger.info('message')

logger.error('error message')
```

The other option is to destructure the functions to their own variables in the require statement:
```
const { info, error } = require('./utils/logger')

info('message')
error('error message')
```
The second way of exporting may be preferable if only a small portion of the exported functions are used in a file. 

#### Finding the usages of your exports with VS Code
>VS Code has a handy feature that allows you to see where your modules have been exported. This can be very helpful for refactoring... If you right-click on a variable in the location it is exported from and select "Find All References", it will show you everywhere the variable is imported. 

## Part 4b - Testing the backend

## Part 4c - User administration

## Part 4d - Token authentication

