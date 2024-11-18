const myLibrary = []

class Book {
    constructor(title, author, pagesAmount, read) {
        this.title = title;
        this.author = author;
        this.pagesAmount = pagesAmount;
        this.read = read;
    }

    info() {
        return this.title + " by " + this.author + ", " +
            this.pagesAmount + " pages, " + (this.read === true ? " read" : " not read");
    }

    toggleRead() {
        this.read = !this.read;
    }


}

const display = document.getElementById("display")


function addBookToLibrary(book) {
    myLibrary.push(book);
    displayBooks();
}

function displayBooks() {


    const booksList = document.getElementById("books");

    while (booksList.firstChild) {
        booksList.removeChild(booksList.firstChild);
    }


    myLibrary.forEach((book, index) => {
        const bookItem = document.createElement("div");
        bookItem.textContent = book.info();
        bookItem.classList.add("card");
        booksList.appendChild(bookItem);

        const buttonDiv = document.createElement("div");
        buttonDiv.classList.add("buttonContainer");
        bookItem.appendChild(buttonDiv);
        const removeButton = document.createElement("button");
        removeButton.classList.add("removeButton");
        removeButton.textContent = "remove";
        buttonDiv.appendChild(removeButton);
        removeButton.addEventListener("click", () => {
            myLibrary.splice(index, 1);
            displayBooks();
        })

        const readButton = document.createElement("button");
        readButton.classList.add("readButton");
        readButton.textContent = book.read ? "Not read" : "Read";
        readButton.addEventListener("click", () => {
            book.toggleRead();
            bookItem.textContent = book.info();
            displayBooks();
        })
        buttonDiv.appendChild(readButton);
    })


}


const dialog = document.querySelector("dialog");
const button = document.getElementById("add");

button.addEventListener("click", () => {
    dialog.style.visibility = "visible";
    dialog.showModal();
});

const addButton = document.getElementById("addBook");
addButton.addEventListener("click", (event) => {
    event.preventDefault();

    const titleField = document.getElementById("title");
    const authorField = document.getElementById("author");
    const pagesField = document.getElementById("pagesAmount");

    const titleError = document.querySelector("#title + span.error");
    const authorError = document.querySelector("#author + span.error");
    const pagesError = document.querySelector("#pagesAmount + span.error");

    let isValid = true;

    if (!titleField.validity.valid) {
        validateField(titleField, titleError);
        isValid = false;
    }

    if (!authorField.validity.valid) {
        validateField(authorField, authorError);
        isValid = false;
    }

    if (!pagesField.validity.valid) {
        validateField(pagesField, pagesError);
        isValid = false;
    }

    if (isValid) {
        console.log("pula")
        const title = titleField.value;
        const author = authorField.value;
        const pagesAmount = pagesField.value;
        const read = document.getElementById("read").checked;

        const book = new Book(title, author, pagesAmount, read);
        addBookToLibrary(book);

        form.reset();
        titleError.textContent = "";
        authorError.textContent = "";
        pagesError.textContent = "";
    }
});


const closeButton = document.getElementById("close");
closeButton.addEventListener("click", () => {
    dialog.style.visibility = "hidden";
    dialog.close();
})

const form = document.querySelector("form");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pagesAmount = document.getElementById("pagesAmount");

const titleError = document.querySelector("#title + span.error");
const authorError = document.querySelector("#author + span.error");
const pagesError = document.querySelector("#pagesAmount + span.error");

title.addEventListener("input", () => validateField(title, titleError));
author.addEventListener("input", () => validateField(author, authorError));
pagesAmount.addEventListener("input", () => validateField(pagesAmount, pagesError));


function validateField(field, errorElement) {
    if (field.validity.valid) {
        errorElement.textContent = "";
        errorElement.className = "error";
    } else {
        showError(field, errorElement);
    }
}

function showError(field, errorElement) {
    if (field.validity.valueMissing) {
        errorElement.textContent = `${field.name} is required.`;
    } else if (field.validity.tooShort) {
        errorElement.textContent = `${field.name} must be at least ${field.minLength} characters long.`;
    } else if (field.validity.rangeUnderflow) {
        errorElement.textContent = `${field.name} must be at least ${field.min}.`;
    } else if (field.validity.typeMismatch) {
        errorElement.textContent = `Please enter a valid ${field.name}.`;
    }
    errorElement.className = "error active";
}
