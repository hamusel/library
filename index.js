const myLibrary = []

function Book(title, author, pagesAmount, read) {
    this.title = title;
    this.author = author;
    this.pagesAmount = pagesAmount;
    this.read = read;
    this.info = function () {
        return this.title + " by " + this.author + ", " +
            this.pagesAmount + " pages, " + (this.read === true ? " read" : " not read");
    }
}

const display = document.getElementById("display")


function addBookToLibrary(book) {
    myLibrary.push(book);
    displayBooks();
}

function displayBooks() {

    const booksList = document.createElement("div");
    booksList.classList.add("books-list");
    display.appendChild(booksList);


    myLibrary.forEach((book) => {
        const bookItem = document.createElement("div");
        bookItem.classList.add("book-item");
        bookItem.textContent = book.info();
        booksList.appendChild(bookItem);
    })

    display.appendChild(booksList);
}

function addBook(title, author, pagesAmount) {
    return new Book(title, author, pagesAmount, false);
}

const dialog = document.querySelector("dialog");
const button = document.getElementById("add");
const form = document.querySelector("form");

button.addEventListener("click", () => {
    dialog.showModal();
});

const addButton = document.getElementById("addBook");
addButton.addEventListener("click", (event) => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pagesAmount = document.getElementById("pagesAmount").value;
    addBookToLibrary(addBook(title, author, pagesAmount));


    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pagesAmount").value = "";
})

const closeButton = document.getElementById("close");
closeButton.addEventListener("click", () => {
    dialog.close();
})



