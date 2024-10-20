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

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function showBooks() {
    for (let i = 0; i < myLibrary.length; i++) {
        console.log(myLibrary[i].title)
    }
}

const hobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false)
const hobbit1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, false)
const hobbit2 = new Book("The Hobbit", "J.R.R. Tolkien", 295, false)
addBookToLibrary(hobbit1)
addBookToLibrary(hobbit2)
showBooks()


