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
        (book.isRead) ? false : true;
    }


    showBookOnDom(book) {
        domManagment.appendBook(book);
    }

}


class SetUpEventListener {
    SetUpFormAndOverLay() {
        const bookForm = document.getElementById('form');
        const addNewBookBtn = document.getElementById('newBookBtn');
        document.addEventListener('DOMContentLoaded', () => {
            bookForm.addEventListener('submit', domManagment.handleFormSubmit);
            addNewBookBtn.addEventListener('click', domManagment.toggleFormAndOverlay);
        });
    }

}


class DomManagment {
    // addNewBookBtn = document.getElementById('newBookBtn');
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



    toggleReadStatus(newBook) {
        newBook.addEventListener('click', function (event) {
            const targetButton = event.target;
            const title = btn.closest('.book').querySelector('.title').innerText;
            library.toggleReadStatus(title);
            if (targetButton.classList.contains('isRead')) {
                targetButton.classList.toggle('read');
                targetButton.classList.toggle('notRead');
                targetButton.innerHTML = targetButton.classList.contains('read') ? 'Completed' : 'Reading';
            }
        });
    }

    resetForm() {
        const bookForm = document.getElementById('form');
        bookForm.reset();
    }

    toggleReadStatusInLibrary(btn) {

        const book = findBook(title);
        (book.isRead) ? book.isRead = false : book.isRead = true;


    }
    removeBookElement(newBook) {
        const removeButtons = newBook.querySelectorAll('.remove');
        removeButtons.forEach(button => {
            button.addEventListener('click', function () {
                button.closest('.book').remove();
                const title = this.parentElement.querySelector('.title').innerText;
                removeBookFromLibrary(title);

            });
        });
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

setUpEventListener.SetUpFormAndOverLay()
