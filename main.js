const addNewBookBtn = document.getElementById('newBookBtn');
const bookContainer = document.getElementById('bookContainer');
const overLay = document.getElementById('overlay');
const formContaier = document.querySelector('.formContainer');
const bookForm = document.getElementById('form');
id = 0;

const library = [];

function Book(bookName, author, pages, isRead) {
    this.name = bookName;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = id;
    addBookToLibrary(this);
}


function addBookToLibrary(book) {
    library[id] = book;
    id++
}

function removeBookFromLibrary(title) {
    const index = library.findIndex(book => book.name === title);
    if (index !== -1) {
        library.splice(index, 1);
    }
}

const book1  = new Book('rins', 'sisj', 99, true);
const book3  = new Book('rins', 'sisj', 99, true);
const book4  = new Book('rins', 'sisj', 99, true);

function findBook(title){
    return library.find((book) => book.name === title);
}

//form Elements
const bookInput = document.getElementById('title')
const authorInput = document.getElementById('author')
const pagesInput = document.getElementById('pages')
const readInput = document.getElementById('read');



// functions
function handleFormSubmit(e) {
    e.preventDefault();
    console.log('hello');
    const newBook = createBookFromFormInputs();
    updateLibraryInDom(newBook);
    hidTheOverlayAndForm();
    resetForm();
}

function createBookFromFormInputs() {
    const bookName = bookInput.value;
    const author = authorInput.value;
    const pages = parseInt(pagesInput.value);
    const isRead = readInput.checked;
    return new Book(bookName, author, pages, isRead);

}

function updateLibraryInDom(book) {
    const newBook = createBookElement(book);
    bookContainer.appendChild(newBook);
    toggleReadStatus(newBook,book);
    removeBookElement(newBook);

}

function createBookElement(book) {
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

function toggleReadStatus(newBook) {
    newBook.addEventListener('click', function (event) {
        const targetButton = event.target;
        toggleReadStatusInLibrary(targetButton);

        if (targetButton.classList.contains('isRead')) {
            targetButton.classList.toggle('read');
            targetButton.classList.toggle('notRead');
            targetButton.innerHTML = targetButton.classList.contains('read') ? 'Completed' : 'Reading';
        }
    });
}

function toggleReadStatusInLibrary(btn){
       const title = btn.closest('.book').querySelector('.title').innerText;
           const book = findBook(title);
              (book.isRead)?book.isRead = false:book.isRead = true;

              console.log(book)
}
function removeBookElement(newBook) {
    const removeButtons = newBook.querySelectorAll('.remove');
    removeButtons.forEach(button => {
        button.addEventListener('click', function () {
            button.closest('.book').remove();
            const title = this.parentElement.querySelector('.title').innerText;
            removeBookFromLibrary(title);
            
        });
    });
}

function resetForm() {
    bookForm.reset();
}

function displayFormContianerAndOverlay() {
    overLay.style.display = 'block';
    formContaier.classList.add('active');
}

function hidTheOverlayAndForm() {
    overLay.style.display = 'none';
    formContaier.classList.remove('active');
}


document.addEventListener('DOMContentLoaded', () => {
    bookForm.addEventListener('submit', handleFormSubmit);
    addNewBookBtn.addEventListener('click', displayFormContianerAndOverlay);
});
