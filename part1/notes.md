## Part 1 - React

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