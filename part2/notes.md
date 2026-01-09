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

### Total times
* Reading: 30 minutes
* Exercises
    * 2.1: 30 minutes
    * 2.2 - 2.5: 30 minutes