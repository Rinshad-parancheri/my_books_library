id = 0;
class Book {
    constructor(bookName, author, pages, isRead) {
        this.name = bookName;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
        this.id = id;
        library.addBook(this);
        library.showBookOnDom(this);
    }
}

class Library {
    #books = []

    addBook(book) {
        this.#books.push(book)
    }

    removeBook(title) {
        console.log(title);
        const index = this.#books.findIndex(book => book.name === title);
        if (index !== -1) {
            this.#books.splice(index, 1);
        } else {
            console.log("no bok found")
        }
    }

    findBook(title) {
        return this.#books.find((book) => book.name === title);
    }

    toggleReadStatus(book) {
        book.isRead = (book.isRead) ? false : true;
        console.log(book.isRead);

    }

    showBookOnDom(book) {
        domManagment.appendBook(book);
    }

}


class SetUpEventListener {
    setUpFormAndOverLay() {
        const bookForm = document.getElementById('form');
        const addNewBookBtn = document.getElementById('newBookBtn');
        document.addEventListener('DOMContentLoaded', () => {
            bookForm.addEventListener('submit', domManagment.handleFormSubmit);
            addNewBookBtn.addEventListener('click', domManagment.toggleFormAndOverlay);
        });
    }

    readingStatus(newBook) {
        const readingStatusBtn = newBook.querySelector('.isRead');
        readingStatusBtn.addEventListener('click', (e) => {
            const title = e.target.closest('.book').querySelector('.title').innerText;
            const book = library.findBook(title);
            library.toggleReadStatus(book);
            domManagment.toggleTheReadStatus(e.target);
        })
    }

    removeBtn(newBook) {
        const removeButtons = newBook.querySelector('.remove');
        removeButtons.addEventListener('click', (e) => {
            const title = e.target.closest('.book').querySelector('.title').innerText;
            library.removeBook(title);
            domManagment.removeBookElement(e.target)
        })
    }

}


class DomManagment {
    handleFormSubmit(e) {
        e.preventDefault();
        const bookName = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const pages = parseInt(document.getElementById('pages').value);
        const isRead = document.getElementById('read').checked;
        const newBook = new Book(bookName, author, pages, isRead);
    }

    appendBook(book) {
        const bookContainer = document.getElementById('bookContainer');
        const newBookDiv = this.createBookElement(book);
        bookContainer.appendChild(newBookDiv);
        this.toggleFormAndOverlay()
        this.resetForm();
        setUpEventListener.readingStatus(newBookDiv);
        setUpEventListener.removeBtn(newBookDiv);
    }

    createBookElement(book) {
        const newBook = document.createElement('div');
        newBook.classList.add('book');
        newBook.innerHTML = `
        <div class="title">${book.name}</div>
        <div class="author">${book.author}</div>
        <div class="pages">${book.pages}</div>
        <button class="isRead ${(book.isRead) ? 'read' : 'notRead'}">${book.isRead ? 'Completed' : 'Reading'}</button>
        <button class="remove">remove</button>
        `;
        return newBook;
    }

    toggleTheReadStatus(targetButton) {
        if (targetButton.classList.contains('isRead')) {
            targetButton.classList.toggle('read');
            targetButton.classList.toggle('notRead');
            targetButton.innerHTML = targetButton.classList.contains('read') ? 'Completed' : 'Reading';
        }
    }

    resetForm() {
        const bookForm = document.getElementById('form');
        bookForm.reset();
    }


    removeBookElement(button) {
        button.closest('.book').remove();
        const title = this.parentElement.querySelector('.title').innerText;
    }

    toggleFormAndOverlay(display) {
        const formContainer = document.querySelector('.formContainer');
        const overlay = document.getElementById('overlay');

        overlay.style.display = display ? 'block' : 'none';
        formContainer.classList.toggle('active', display);
    }
}

const domManagment = new DomManagment();
const library = new Library();
const setUpEventListener = new SetUpEventListener();

setUpEventListener.setUpFormAndOverLay()
