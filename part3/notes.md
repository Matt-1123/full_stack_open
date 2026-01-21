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

## Part 3b - Deploying app to internet

## Part 3c - Saving data to MongoDB

## Part 3d - Validation and ESLint