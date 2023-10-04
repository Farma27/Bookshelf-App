/** 
    [
        {
            id: number | string,
            title: string,
            author: string,
            year: number,
            isComplete: boolean
        }
    ]
 */

/** 
 * declaration of book array and localStorage key
 * @param {any} books - data buku
 * @param {any} RENDER_KEY - render event
 * @param {any} SAVE_KEY - saving book data to localStorage
 * @param {any} STORAGE_KEY - localStorage key
 */
const books = []
const RENDER_KEY = 'render-book'
const SAVE_KEY = 'save-book'
const STORAGE_KEY = 'bookshelf-app'

/** created event when web loaded */
document.addEventListener('DOMContentLoaded', () => {
    const formAdd = document.getElementById('form-add')
    formAdd.addEventListener("submit", (e) => {
        e.preventDefault()
        addBook()
    })

    const formSearch = document.getElementById("form-search")
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault()
        searchBooks()
    })

    if (isStorageExist()) {
        loadData()
    }
})

/** function for adding books */
function addBook() {
    const title = document.getElementById("title").value
    const author = document.getElementById("author").value
    const year = parseInt(document.getElementById("year").value)
    const isComplete = document.getElementById("isComplete").checked

    /** @function */
    const id = generateId()
    const booksData = generateBooksData(id, title, author, year, isComplete)

    books.push(booksData)

    document.dispatchEvent(new Event(RENDER_KEY))
    saveBooks()

    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("year").value = "";
    document.getElementById("isComplete").checked = false;
}

/** 
 * generate book id
 * @generator
 * @yields {number}
 */
function generateId() {
    return +new Date()
}

/**
 * generate books object
 * @generator
 * @yields {object}
 * @param {number} id - unique id for each books data
 * @param {string} title
 * @param {string} author 
 * @param {number} year 
 * @param {boolean} isComplete - status of the books
 */
function generateBooksData(id, title, author, year, isComplete) {
    return {
        id, 
        title, 
        author, 
        year, 
        isComplete
    }
}

/** create render event */
document.addEventListener(RENDER_KEY, () => {
    const incompleteBooks = document.getElementById('incomplete')
    incompleteBooks.innerHTML = ''

    const completeBooks = document.getElementById('complete')
    completeBooks.innerHTML = ''

    for (const bookItem of books) {
        const bookElement = createBook(bookItem)
        if (bookItem.isComplete) {
            completeBooks.append(bookElement)
        } else {
            incompleteBooks.append(bookElement)
        }
    }
})

/** 
 * function for making books
 * @param {any} book 
 */
function createBook(book) {
    const newBook = document.createElement("li")
    if (book.isComplete) {
        newBook.innerHTML = `
            <h3>${book.title}</h3>
            <p>Nama Penulis: ${book.author}</p>
            <p>Tahun Terbit: ${book.year}</p>
            <div class="btn-group">
                <button class="btn-change" onclick="incompleteBook(${book.id});">Belum Selesai dibaca</button>
                <button class="btn-delete" onclick="return confirm('Apakah kamu yakin akan menghapus data ini?') ? removeBook(${book.id}) : '';">Hapus</button>

            </div>
        `
    } else {
        newBook.innerHTML = `
            <h3>${book.title}</h3>
            <p>Nama Penulis: ${book.author}</p>
            <p>Tahun Terbit: ${book.year}</p>
            <div class="btn-group">
                <button class="btn-change" onclick="completeBook(${book.id});">Selesai dibaca</button>
                <button class="btn-delete" onclick="return confirm('Apakah kamu yakin akan menghapus data ini?') ? removeBook(${book.id}) : '';">Hapus</button>

            </div>
        `
    }

    return newBook
}

/** function for find book */
function findBook(bookId) {
    for (const bookItem of books) {
        if (bookItem.id === bookId) {
            return bookItem
        }
    }

    return null
}

/** function for find index of book */
function findBookIndex(bookId) {
    for (const index in books) {
        if (books[index].id === bookId) {
            return index
        }
    }

    return -1
}

/**
 * function for change book status to complete
 * @param {number} bookId
 */
function completeBook(bookId) {
    const book = findBook(bookId)

    if (book === null) return

    book.isComplete = true
    document.dispatchEvent(new Event(RENDER_KEY))
    saveBooks()
}

/**
 * function for change book status to incomplete
 * @param {number} bookId
 */
function incompleteBook(bookId) {
    const book = findBook(bookId)

    if (book == null) return

    book.isComplete = false
    document.dispatchEvent(new Event(RENDER_KEY))
    saveBooks()
}

/**
 * function for removing book
 * @param {number} bookId
 */
function removeBook(bookId) {
    const book = findBookIndex(bookId)

    if (book === -1) return

    books.splice(book, 1)
    document.dispatchEvent(new Event(RENDER_KEY))
    saveBooks()
}

/** function for saving book to localStorage */
function saveBooks() {
    if(isStorageExist()) {
        const parsed = JSON.stringify(books)
        
        localStorage.setItem(STORAGE_KEY, parsed)
        document.dispatchEvent(new Event(SAVE_KEY))
    }
}


/** function for checking browser support in localStorage */
function isStorageExist() {
    if (typeof (storage) === undefined) {
        alert ('Browser not supported for localStorage')
        return false;
    }

    return true
}

/** function for loading data from localStorage */
function loadData() {
    const serializedData = localStorage.getItem(STORAGE_KEY)
    let data = JSON.parse(serializedData)

    if (data !== null) {
        for (const book of data) {
            books.push(book)
        }
    }

    document.dispatchEvent(new Event(RENDER_KEY))
}

/** function for searching books */
function searchBooks() {
    const keyword = document.getElementById("search").value.toLowerCase();
    const allBooks = document.querySelectorAll("li");

    allBooks.forEach(function (books) {
        const booksInfo = books.textContent.toLowerCase();
        if (booksInfo.includes(keyword)) {
            books.style.display = "";
        } else {
            books.style.display = "none";
        }
    });
}