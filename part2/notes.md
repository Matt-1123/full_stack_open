# Part 2

## Part 2a: Rendering a collection, modules

### Anti-pattern: Array Indexes as Keys
* Array indexes are not recommended as keys, e.g.
```
<ul>
  {notes.map((note, i) => 
    <li key={i}>
      {note.content}
    </li>
  )}
</ul>
```
* Basically, this doesn't work well when adding items to the array and sorting/mapping again. React can get confused about which properties belong to which mapped component.

### Total times, part 2a
* Reading: 30 minutes
* Exercises
    * 2.1: 30 minutes
    * 2.2 - 2.5: 30 minutes
* Total: 90 minutes

### Total times, part 2b
* Reading: 20 minutes
* Exercises
  * 2.6: The Phonebook Step 1: 20 minutes
  * 2.7: The Phonebook Step 2: 5 minutes
  * 2.8: The Phonebook Step 3: 20 minutes
  * 2.9: The Phonebook Step 4: 30 minutes
  * 2.10: The Phonebook Step 5: 20 minutes
* Total: 115 minutes

---

## Part 2c
>json-server enables the use of server-side functionality in the development phase without the need to program any of it.

>In the part0 example project, we already learned a way to fetch data from a server using JavaScript. The code in the example was fetching the data using XMLHttpRequest, otherwise known as an HTTP request made using an XHR object. This is a technique introduced in 1999, which every browser has supported for a good while now.
>
>The use of XHR is no longer recommended, and browsers already widely support the fetch method, which is based on so-called promises, instead of the event-driven model used by XHR.

```
const xhttp = new XMLHttpRequest()

// event handler registered to the xhttp object representing the HTTP request
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    const data = JSON.parse(this.responseText)
    // handle the response that is saved in variable data
  }
}

xhttp.open('GET', '/data.json', true)
xhttp.send()
```

### The browser as a runtime environment
>In contrast [to Java], JavaScript engines, or runtime environments follow the asynchronous model. In principle, this requires all IO operations (with some exceptions) to be executed as non-blocking. This means that code execution continues immediately after calling an IO function, without waiting for it to return.
>
>When an asynchronous operation is completed, or, more specifically, at some point after its completion, the JavaScript engine calls the event handlers registered to the operation.
>
>Currently, JavaScript engines are single-threaded, which means that they cannot execute code in parallel. As a result, it is a requirement in practice to use a non-blocking model for executing IO operations. Otherwise, the browser would "freeze" during, for instance, the fetching of data from a server.

> In today's browsers, it is possible to run parallelized code with the help of so-called web workers

### npm
>Nowadays, practically all JavaScript projects are defined using the node package manager, aka npm. The projects created using Vite also follow the npm format. A clear indicator that a project uses npm is the package.json file located at the root of the project.

>In addition to adding axios to the dependencies, the npm install command also downloaded the library code. As with other dependencies, the code can be found in the node_modules directory located in the root. 

* When you run json-server on a port (e.g. 3001), the application binds itself to that port.


```
npm install axios
npm install json-server --save-dev
```
>There is a fine difference in the parameters. axios is installed as a runtime dependency of the application because the execution of the program requires the existence of the library. On the other hand, json-server was installed as a development dependency (--save-dev), since the program itself doesn't require it. It is used for assistance during software development. There will be more on different dependencies in the next part of the course.

### Axios and promises
>To run json-server and your react app simultaneously, you may need to use two terminal windows. One to keep json-server running and the other to run our React application.

>A Promise is an object representing the eventual completion or failure of an asynchronous operation.
>In other words, a promise is an object that represents an asynchronous operation. A promise can have three distinct states:
>
>The promise is pending: It means that the asynchronous operation corresponding to the promise has not yet finished and the final value is not available yet.
>The promise is fulfilled: It means that the operation has been completed and the final value is available, which generally is a successful operation.
>The promise is rejected: It means that an error prevented the final value from being determined, which generally represents a failed operation.

>to access the result of the operation represented by the promise, we must register an event handler to the promise. This is achieved using the method then:
```
const promise = axios.get('http://localhost:3001/notes')

promise.then(response => {
  console.log(response)
})
```
>The JavaScript runtime environment calls the callback function registered by the then method providing it with a response object as a parameter. The response object contains all the essential data related to the response of an HTTP GET request, which would include the returned data, status code, and headers.

>Storing the promise object in a variable is generally unnecessary, and it's instead common to chain the then method call to the axios method call, so that it follows it directly:
```
axios
  .get('http://localhost:3001/notes')
  .then(response => {
    const notes = response.data
    console.log(notes)
  })
```

### Effect-hooks
>Effects let a component connect to and synchronize with external systems. This includes dealing with network, browser DOM, animations, widgets written using a different UI library, and other non-React code.
>As such, effect hooks are precisely the right tool to use when fetching data from a server.
* UseEffect is executed immediately after the component is rendered for the first time.
>So by default, the effect is always run after the component has been rendered. In our case, however, we only want to execute the effect along with the first render. The second parameter of useEffect is used to specify how often the effect is run. If the second parameter is an empty array [], then the effect is only run along with the first render of the component.

### The development runtime environment
>The JavaScript code making up our React application is run in the browser. The browser gets the JavaScript from the React dev server, which is the application that runs after running the command npm run dev. The dev-server transforms the JavaScript into a format understood by the browser. Among other things, it stitches together JavaScript from different files into one file.
>
>The React application running in the browser fetches the JSON formatted data from json-server running on port 3001 on the machine. The server we query the data from - json-server - gets its data from the file db.json.

![development runtime environment](./img/development-runtime-environment.png "development runtime environment")

### Total times, part 2c
* Reading: 60 minutes
* Exercises
  * 2.11: The Phonebook Step 6 => 