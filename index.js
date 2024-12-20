const myLibrary = []

class Book {
    constructor(title, author, pagesAmount, read) {
        this.title = title;
        this.author = author;
        this.pagesAmount = pagesAmount;
        this.read = read;
    }

    info(){
        return this.title + " by " + this.author + ", " +
             this.pagesAmount + " pages, " + (this.read === true ? " read" : " not read");
    }
    toggleRead() {
    this.read = !this.read;
}


}


// Book.prototype.toggleRead = function () {
//     this.read = !this.read;
// };

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
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pagesAmount = document.getElementById("pagesAmount").value;
    const read = document.getElementById("read").checked;
    const book = new Book(title, author, pagesAmount, read);
    addBookToLibrary(book);


    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pagesAmount").value = "";

})

const closeButton = document.getElementById("close");
closeButton.addEventListener("click", () => {
    dialog.style.visibility = "hidden";
    dialog.close();
})



