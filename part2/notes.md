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

### Total times, part 2b
* Reading: 20 minutes
* Exercises
  * 2.6: The Phonebook Step 1: 20 minutes
  * 2.7: The Phonebook Step 2: 
  * 2.8: The Phonebook Step 3: 
  * 2.9: The Phonebook Step 4: 
  * 2.10: The Phonebook Step 5: 