# Part 1 - React

## Part 1a: Introduction to React
### JSX
* Under the hood, JSX returned by React components is compiled into JavaScript using Babel. Apps created with Vite compile automatically.
* After compiling, a JSX component looks something like this:

```
const App = () => {
  const now = new Date()
  const a = 10
  const b = 20
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p', null, 'Hello world, it is ', now.toString()
    ),
    React.createElement(
      'p', null, a, ' plus ', b, ' is ', a + b
    )
  )
}
```

> In practice, JSX is much like HTML with the distinction that with JSX you can easily embed dynamic content by writing appropriate JavaScript within curly braces.

### Multiple Components
>a core philosophy of React is composing applications from many specialized reusable components.

### Props
>As an argument, the parameter receives an object, which has fields corresponding to all the "props" the user of the component defines.

### Some Notes
>Because the root element is stipulated, we have "extra" div elements in the DOM tree. This can be avoided by using fragments, i.e. by wrapping the elements to be returned by the component with an empty element

### Do not render objects
* This causes an error

>In React, the individual things rendered in braces must be primitive values, such as numbers or strings.

Total time for reading: 30 minutes

### Exercise 1.1: Course Information, step 1
Total time: 30 minutes

### Exercise 1.2: Course Information, step 2
Total time: 15 minutes

### Exercises 1.3 - 1.5
Total time: 30 minutes

---

## Part 1c: Component state, event handlers

### Passing state - to child components
>In React, it’s conventional to use onSomething names for props which take functions which handle events and handleSomething for the actual function definitions which handle those events.

### Refactoring components
* Compact component example: 
`const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>`

---

## Part 1d: A more complex state, debugging React apps

### Object spread syntax 
```
const handleLeftClick = () =>
  setClicks({ ...clicks, left: clicks.left + 1 })

const handleRightClick = () =>
  setClicks({ ...clicks, right: clicks.right + 1 })
```

>In practice { ...clicks } creates a new object that has copies of all of the properties of the clicks object. When we specify a particular property - e.g. right in { ...clicks, right: 1 }, the value of the right property in the new object will be 1.

* React docs share best practices on when to store state in a more complex data structure: https://react.dev/learn/choosing-the-state-structure

### Handling arrays
* Use the concat method rather than the push method to create a copy of the array object and not add to it directly.

### Update of the state is asynchronous
>state update in React happens asynchronously, i.e. not immediately but "at some point" after the current component function is finished, before the component is rendered again.
* e.g. 
```
const handleLeftClick = () => {
  setAll(allClicks.concat('L'))
  const updatedLeft = left + 1
  setLeft(updatedLeft)
  setTotal(updatedLeft + right) // rather than setTotal(left + right) 
}
```

### Debugging React applications
>Logging output to the console is by no means the only way of debugging our applications. You can pause the execution of your application code in the Chrome developer console's [debugger](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/debugger), by writing the command debugger anywhere in your code.

* ^ In Firefox Developer Edition this is in Debugger > Sources

### Rules of Hooks
>hooks may only be called from the inside of a function body that defines a React component

### A function that returns a function
>The return value of the function is another function that is assigned to the handler variable

```
const App = () => {
  const [value, setValue] = useState(10)


  const hello = (who) => {
    const handler = () => {
      console.log('hello', who)
    }
    return handler
  }

  return (
    <div>
      {value}

      <button onClick={hello('world')}>button</button>
      <button onClick={hello('react')}>button</button>
      <button onClick={hello('function')}>button</button>
    </div>
  )
}
```

>Functions returning functions can be utilized in defining generic functionality that can be customized with parameters. The hello function that creates the event handlers can be thought of as a factory that produces customized event handlers meant for greeting users.

* Condensed code from above:
```
const hello = (who) => {
  return () => {
    console.log('hello', who)
  }
}
```

* Even more condensed:
```
const hello = (who) => {
  return () => {
    console.log('hello', who)
  }
}
```

* Even more...
```
const hello = (who) => () => {
  console.log('hello', who)
}
```

** I prefer the following alternative event handler method instead**

>Using functions that return functions is not required to achieve this functionality. Let's return the setToValue function which is responsible for updating state into a normal function:

```
const App = () => {
  const [value, setValue] = useState(10)

  const setToValue = (newValue) => {
    console.log('value now', newValue)
    setValue(newValue)
  }

  return (
    <div>
      {value}
      <button onClick={() => setToValue(1000)}>
        thousand
      </button>
      <button onClick={() => setToValue(0)}>
        reset
      </button>
      <button onClick={() => setToValue(value + 1)}>
        increment
      </button>
    </div>
  )
}
```

With Button components this would be:
```
const App = (props) => {
  // ...
  return (
    <div>
      {value}

      <Button onClick={() => setToValue(1000)} text="thousand" />
      <Button onClick={() => setToValue(0)} text="reset" />
      <Button onClick={() => setToValue(value + 1)} text="increment" />
    </div>
  )
}
```

>Choosing between the two presented ways of defining your event handlers is mostly a matter of taste.

Total time spent on part 1d lecture material: 1 hour

## Part 1d exercices
* 1.6: unicafe step 1 => 40 minutes
* 1.7: unicafe step 2 => 15 minutes
* 1.8: unicafe step 3 => 5 minutes
* 1.9: unicafe step 4 => 5 minutes
* 1.10: unicafe step 5 => 15 minutes

