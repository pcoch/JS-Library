# Library App
Odin Project JS Course: Library

A small Library app, created with HTML, CSS and JavaScript. The data is stored in localStorage. The project is from The Odin Project curriculum.

<h3><a href="https://goofy-saha-f30ade.netlify.app/">View Library App</a></h3>

<h1>Requirements</h1>
A render() function that displays each book on the page
A form that allows user to add new books
A delete button
A button to handle the read status of the book
Local storage for persistence on page refresh


<h1>Learnings & Challenges</h1>
- Form in modal required submit method rather then click to access in built HTML form client side validation. This was a time saver so I didn't need to write up my own JS validation. Answer from Mark V here: https://stackoverflow.com/questions/48897314/check-required-fields-with-preventdefault
- Localstorage required use of insertAdjacentHTML method to reload html on page refresh. Very handy method for this use case.
- Used the Date.now() method to create a unique ID for each card. This is used to identify the book html and book object in library array

**To do:**
Make responsive. Just desktop for now.
