# Part 3 - Programming a server with NodeJS and Express

## Part 3a - Node.js and Express
* NodeJS - a JS runtime environment based on Google's Chrome V8 JavaScript engine. It provides built-in modules, most notably the http mmodule, to create a web server programmatically. 
    * Unlike traditional web servers like Apache or Nginx, which are pre-configured to serve static content, the Node.js http module allows devs to build a custom, event-driven server using JS. You don't write code that gets executed by Apache or Nginx (they're not runtimes) but instead write configuration files that instruct them what to do.
* Browsers don't yet support the newest features of JS, so code running in the browser must be transpiled, for instance with babel. On the other hand, JS running in the backend is different because the newest version of Node supports most of the latest features of JS, so there's no need to transpile the code.
    * Transpiling is the process of converting source code written in a modern version or superset of the language into equivalent code that's compatible with older environments, such as legacy web browsers. This is a form of source-to-source compilation, where the code remains at a similar level of abstraction and is still human-readable. It's primary purpose is to allow developers to use the latest features and improved syntax without sacrificing backwards compatibility for their users.
* Run a program directly with Node from the command line with either `node index.js` or run it as an npm script: `npm start` (defined in package.json)

```
"scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
}
```

    * However, it's customary for npm projects to execute projects as npm scripts (npm start)

* `const http = require('http')` causes the application to import Node's built-in web server module.
    * ^ This is a CommonJS module. Node also supports the use of ES6 modules (`import http from 'http'`) but its support is not fully supported(?).
    >CommonJS modules function almost exactly like ES6 modules, at least as far as our needs in this course are concerned.

### Express
>Implementing our server code directly with Node's built-in http web server is possible. However, it is cumbersome, especially once the application grows in size. By far the most popular library for Node.js is Express. It and other libraries offer a more pleasing interfacec to work with the built-in http module. They provide a better abstraction for general use cases required to build a backend server.

* When installing express (and any dependency), the source code for the dependency is installed in the node_modules directory. Dependencies of the Express library, dependencies of those dependencies, and so forth, are also installed. These are called __transitive dependencies__.

`"express": "^5.2.1"`
>The caret in the front of ^5.2.1 means that if and when the dependencies of a project are updated, the version of Express that is installed will be at least 5.2.1. However, the installed version of Express can also have a larger __patch number__ (the last number), or a larger __minor number__ (the middle number). The __major version__ of the library indicated by the first major number must be the same.
    * If the major number of a dependency does not change, then the newer versions should be backwards compatible. This means that if our application happened to use version 5.99.175 of Express in the future, then all the code implemented in this part would still have to work without making changes to the code. In contrast, the future 6.0.0 version of Express may contain changes that would cause our application to no longer work.

* Update dependencies with `npm update`

* Install all up-to-date dependencies of a project in package.json by running `npm install`.

### Web and Express
```
const express = require('express')
const app = express()
```

Import express, which is a function that is used to create an Express application stored in the app variable.

Define routes to the application. Define event handlers that are used to handle HTTP requests (e.g. GET, POST) made to certain paths, e.g. 

```
app.get('/api/notes', (request, response) => {
  response.json(notes)
})
```

The res.send method sends the HTTP response.
```
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})
```

res.send() and res.json() are identical when an object or array is passed, but res.json will also convert non-objects, such as null and undefined, which are not valid JSON. 
    * res.json eventually calls res.send, but firest makes these JSON conversions
    * In the notes app, calling the json method sends the notes array that was passed to it as a **JSON formatted string**. Express automatically sets the Content-Type header of the response with the appropriate value of application/json.

__node-repl__ - You can start the interactive node-repl by typing in node in the command line. The repl is particularly useful for testing how commands work while you're writing application code.
>The node:repl module provides a Read-Eval-Print-Loop (REPL) implementation that is available both as a standalone program or includible in other applications. It can be accessed by typing `node` in the terminal.

### Automatic Change Tracking
You can make the server track changes (rather than stopping and restarting the application) by starting it with the `--watch` option: `node --watch index.js`. Now, changes to the application's code will cause the server to restart automatically (but you still need to refresh the browser - no hot reload functionality like with React).

As an npm script, this would look like: 

```
{
  // ..
  "scripts": {
    "start": "node index.js",
    "dev": "node --watch index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  // ..
}
```

### REST
* __REST (Representational State Transfer)__ was introduced in 2000 by Roy Fielding, and is an architectural style meant for building scalable web applications. 

Every resource has a unique address, with the common naming convention combining the root URL of the service with name of the resource and the resource's unique identifier, e.g. www.example.com/api/notes/10

Different operations can be executed on resources, defined by HTTP verbs, e.g. GET, POST, DELETE, PUT, PATCH.

PUT replaces the entire identified resource with the request data, whereas PATCH replaces only a part of the resource with the request data.

There are semantic arguments over what is CRUD and what is just resource-oriented architecture (like CRUD). But this lesson won't focus on that.

### Fetching a single resource
Define parameters for routes in Express by using the colon syntax:

```
app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)
  response.json(note)
})
```

^ app.get('/api/notes/:id', ...) will handle all HTTP GET requests that are of the form /api/notes/SOMETHING, where SOMETHING is an arbitrary string

The end() method is used for responding to a request without sending any data, e.g. `response.status(404).end()`

```
app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)
  
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})
```

When returning a 404 error, we do not need to display anything in the browser because REST APIs are interfaces that are intended for programmatic use, and the error status code is all that is needed.

Use __statusMessage__ to override the default NOT FOUND message if you want to give a clue about the reason for sending an error type such as 404.

### Deleting resources
>If deleting the resource is successful, meaning that the note exists and is removed, we respond to the request with the status code 204 no content and return no data with the response.
>
>There's no consensus on what status code should be returned to a DELETE request if the resource does not exist. The only two options are 204 and 404. For the sake of simplicity, our application will respond with 204 in both cases.

```
app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})
```

### The VS Code REST client
* You can use the VS Code REST client plugin instead of Postman

>Once the plugin is installed, using it is very simple. We make a directory at the root of the application named requests. We save all the REST client requests in the directory as files that end with the .rest extension.

### Receiving data
When making a POST request, send the data for that new resource to the server in JSON format. To access the data easily, use the Express json-parser with the command `app.use(express.json())`.

__express.json()__ is a built-in middleware function in the Express.js framework that parses incoming HTTP requests with JSON payloads. It converts the JSON text data from the request body into a JavaScript object, which is then populated in the req.body property of the request object, making it easy to use in your route handlers. 

>[express.json] This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
>
>Returns middleware that only parses JSON and only looks at requests where the Content-Type header matches the type option. This parser accepts any Unicode encoding of the body and supports automatic inflation of gzip and deflate encodings.
>
>A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body), or undefined if there was no body to parse, the Content-Type was not matched, or an error occurred.

### About HTTP request types
>The HTTP Standard [(RFC)] talks about two properties related to request types - safety and idempotency
>
>The HTTP GET request should be *safe*
>
> "In particular, the convention has been established that the GET and HEAD methods SHOULD NOT have the significance of taking an action other than retrieval. These methods ought to be considered "safe"."
>
>Safety means that the executing request must not cause any side effects on the server. By side effects, we mean that the state of the database must not change as a result of the request, and the response must only return data that already exists on the server.
>
>Nothing can ever guarantee that a GET request is safe, this is just a recommendation that is defined in the HTTP standard. By adhering to RESTful principles in our API, GET requests are always used in a way that they are safe.

>All HTTP requests except POST should be *idempotent*:
>
>"Methods can also have the property of "idempotence" in that (aside from error or expiration issues) the side-effects of N > 0 identical requests is the same as for a single request. The methods GET, HEAD, PUT and DELETE share this property"
>
>This means that if a request does generate side effects, then the result should be the same regardless of how many times the request is sent.

### Middleware
The Express json-parser (`app.use(express.json())
`) is a middleware. __Middleware__ are functions that can be used for handling request and response objects.

>The json-parser we used earlier takes the raw data from the requests that are stored in the request object, parses it into a JavaScript object and assigns it to the request object as a new property body.

>In practice, you can use several middlewares at the same time. When you have more than one, they're executed one by one in the order that they were listed in the application code.
>
>Let's implement our own middleware that prints information about every request that is sent to the server.
>
>Middleware is a function that receives three parameters:

```
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
```

>At the end of the function body, the next function that was passed as a parameter is called. The next function yields control to the next middleware.

>Middleware is used like this: 
>
>`app.use(requestLogger)`

\*
>Remember, middleware functions are called in the order that they're encountered by the JavaScript engine. Notice that json-parser is listed before requestLogger , because otherwise request.body will not be initialized when the logger is executed!


>Middleware functions have to be used before routes when we want them to be executed by the route event handlers. Sometimes, we want to use middleware functions after routes. We do this when the middleware functions are only called if no route handler processes the HTTP request.
>
>Let's add the following middleware after our routes. This middleware will be used for catching requests made to non-existent routes. For these requests, the middleware will return an error message in the JSON format.

```
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
```

### Total times
* Lecture notes: 2 hours
* Exercises
  * 3.1: Phonebook backend step 1 => 20 minutes
  * 3.2: Phonebook backend step 2 => 10 minutes
  * 3.3: Phonebook backend step 3 => 5 minutes
  * 3.4: Phonebook backend step 4 => 15 minutes
  * 3.5: Phonebook backend step 5 => 30 minutes
  * 3.6: Phonebook backend step 6 => _ minutes

## Part 3b - Deploying app to internet

## Part 3c - Saving data to MongoDB

## Part 3d - Validation and ESLint