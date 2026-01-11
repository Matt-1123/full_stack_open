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
>json-server is a handy tool that enables the use of server-side functionality in the development phase without the need to program any of it.

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

