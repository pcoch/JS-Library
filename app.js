let library = []; //empty array to hold book objects

//create a book from form submit
const createBook = (event) => {
    event.preventDefault(); //stop the form submitting

    let book = {
        title: document.getElementById('title').value, //taking value from form input
        author: document.getElementById('author').value,
        pages: document.getElementById('pages').value,
        readStatus: document.getElementById('read').checked,
        id: Date.now(),
    }
    library.push(book); //add book object to library array
    document.getElementById('form').reset(); //clear the form for next entry
    addBookToLibrary(book); //display elements in html
    closeModal(); //toggle modal
    setLocalStorage(); //update local storage
};

//display book on front end
const addBookToLibrary = (book) => {

    const card = document.createElement("div");
    card.classList.add('book-card');
    card.setAttribute('id', `${book.id}`);
    container.appendChild(card);

    const title = document.createElement("h2");
    title.innerHTML = book.title;
    card.appendChild(title);

    const author = document.createElement("h3");
    author.innerHTML = book.author;
    card.appendChild(author);

    const pages = document.createElement("h3");
    pages.innerHTML = `${book.pages} pages`;
    card.appendChild(pages);

    const readStatus = document.createElement("h3");
    if (book.readStatus === true) {
        readStatus.innerHTML = 'Read ✅';
        readStatus.classList.add('card-button');
        readStatus.setAttribute('data', `${book.id}`);
        readStatus.setAttribute("onclick", "updateReadStatus(event)");
        card.append(readStatus);
    }
    if (book.readStatus === false) {
        readStatus.innerHTML = 'Unread 👀';
        readStatus.classList.add('card-button');
        readStatus.setAttribute('data', `${book.id}`);
        readStatus.setAttribute("onclick", "updateReadStatus(event)");
        card.append(readStatus);
    }

    const removeCard = document.createElement("h3");
    removeCard.innerHTML = '❎';
    removeCard.classList.add('remove-card');
    removeCard.setAttribute('data', `${book.id}`);
    removeCard.setAttribute("onclick", "removeCardFunc(event)");
    card.append(removeCard);

    setLocalStorage();
};

//click event handler on form submit > runs createBook function
const form = document.getElementById('form');
form.addEventListener('submit', createBook);

//remove book card
const removeCardFunc = (event) => {
    let cardID = event.target.getAttribute("data");
    let bookIndex = library.findIndex((element) => element.id == cardID);
    library.splice(bookIndex, 1); //removes book obj from library array
    let bookCard = document.getElementById(cardID);
    bookCard.remove(); //removes HTML card element from DOM
    setLocalStorage();
};

//update read status
const updateReadStatus = (event) => {
    let cardID = event.target.getAttribute("data");
    let bookIndex = library.findIndex((element) => element.id == cardID);

    const readStatus = document.querySelector(`[data="${cardID}"]`);

    if (library[bookIndex].readStatus == true) {
        library[bookIndex].readStatus = false;
        readStatus.innerHTML = 'Unread 👀';

    } else if (library[bookIndex].readStatus == false) {
        (library[bookIndex].readStatus = true)
        readStatus.innerHTML = 'Read ✅';
    }
    setLocalStorage();
};

// UI Elements
const container = document.querySelector('.main-container');
const header = document.querySelector('.header');
const footer = document.querySelector('.footer');
const button = document.querySelector('.button');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close-btn');

// Modal
//open modal
const openModal = () => {
    modal.classList.remove('hide');
    container.classList.add('blur-filter')
    header.classList.add('blur-filter')
    footer.classList.add('blur-filter')
};
button.addEventListener('click', openModal);

//close modal
const closeModal = () => {
    modal.classList.add('hide');
    container.classList.remove('blur-filter')
    header.classList.remove('blur-filter')
    footer.classList.remove('blur-filter')
};
container.addEventListener('click', closeModal);
footer.addEventListener('click', closeModal);
closeBtn.addEventListener('click', closeModal);


// setting Library to be stored in local storage
function setLocalStorage() {
    let libraryHTML = document.querySelector('.main-container').innerHTML;

    localStorage.setItem('libraryArr', JSON.stringify(library));
    localStorage.setItem('libraryDOM', libraryHTML)
};

//pulls books from local storage when page is refreshed
function getLocalStorage() {

    //retrieves library array from local 
    const booksFromStorage = JSON.parse(localStorage.getItem('libraryArr'));
    if (booksFromStorage !== null) {
        library = booksFromStorage;
    } else library = [];

    //retrieves HTML from storage and adds to DOM
    let libraryHTML = document.querySelector('.main-container').innerHTML;
    const DOMFromStorage = localStorage.getItem('libraryDOM');
    if (DOMFromStorage !== null) {
        libraryHTML = DOMFromStorage;
        container.insertAdjacentHTML('beforeend', libraryHTML);
    }

};
getLocalStorage();
