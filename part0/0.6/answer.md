## 0.6: New note in Single page app diagram
Create a diagram depicting the situation where the user creates a new note using the single-page version of the app.

``` mermaid
    sequenceDiagram
    actor User
    participant Browser
    participant Server

    User->>Browser: Enter text in text field

    User->>Browser: Click Save button
    Note right of User: The form.onsubmit event handler from the JS fetched from the server is triggered. <br> This function adds the new note to the notes array, rerenders the note list on the page, and sends the new note to the server.

    Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate Server

    Server->>Browser: HTTP status code 201 Created
    deactivate Server
    Note right of Browser: No redirect. The browser stays on the same page.
```