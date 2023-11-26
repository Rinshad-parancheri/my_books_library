const addNewBookBtn = document.getElementById('newBookBtn');
const bookContainer = document.getElementById('bookContainer');
const overLay = document.getElementById('overlay');
const formContaier = document.querySelector('.formContainer');
const bookForm = document.getElementById('form');


//form Elements
const bookInput = document.getElementById('title')
const authorInput = document.getElementById('author')
const pagesInput = document.getElementById('pages')
const readInput = document.getElementById('read');





let currentBookName = '';
let currnetAuthor = '';
let currentPages = 0;
let read = false;
let bookNos = 0;

bookForm.onsubmit = (e) => {
    e.preventDefault();
    updateTheCurrentBook(e);
    hidTheOverlayAndForm();
}
addNewBookBtn.onclick = (e) => {
    displayFormContianerAndOverlay();
}
  
// functions
function updateTheCurrentBook(e) {
    currentBookName = bookInput.value;
    currnetAuthor = authorInput.value; // corrected variable name
    currentPages = pagesInput.value;
    read = (readInput.checked)?true:false; // corrected property to get checkbox state
   let book = new Library.Book(currentBookName, currnetAuthor, currentPages, read);
   updateLibraryInDom(book)
}

function updateLibraryInDom(book){   //     console.log(book.author);
    const newBook = document.createElement('div');
    newBook.classList.add('book');
    newBook.innerHTML = `
        <div class="title">${book.name}</div>
        <div class="author">${book.author}</div>
        <div class="pages">${book.pages}</div>
        <button class="isRead ${(book.isRead)?'read':'notRead'}">${book.isRead ? 'Completed' : 'Reading'}</button>
        <button class="remove">remove</button>
    `;
    bookContainer.appendChild(newBook);
    let readBtn = document.querySelectorAll('.isRead');

    readBtn.forEach(btn => {
        btn.onclick = (e) => {
            if (btn.classList.contains('read')){
            btn.classList.remove('read');
            btn.classList.add('notRead');
            btn.innerHTML = `Reading`
            }else if (btn.classList.contains('notRead')){
                btn.classList.add('notRead');
                btn.classList.add('read');
                btn.innerHTML = 'completed';
            }
        }
    })
    let  removeButtons = document.querySelectorAll('.remove');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.book').remove();
        });
    });
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

// 
const Library = (function () {
    const userBooks = [];
    let count = 0;
    console.log(userBooks);
    function Book(bookName,author, pages, isRead)  {
        this.name = bookName;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
        this.id = count;
        this.addToLibrary();

    }

    Book.prototype.addToLibrary = function () {
        userBooks.push(this);
        count++;
        console.log(this);
    };

    Book.prototype.showEachBook = function () {
      
    }

    function getBookByOrder(id) {
        return userBooks.find(book => book.id === id);
    }

    return {
        Book,
        getBookByOrder
    };
})();





