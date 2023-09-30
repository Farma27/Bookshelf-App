function createBook(title, author, year, isComplete) {
    const newBook = document.createElement("li");
    newBook.innerHTML = `
        <h3>${title}</h3>
        <p>Nama Penulis: ${author}</p>
        <p>Tahun Terbit: ${year}</p>
    `;

    const buttonGroup = document.createElement("div");
    buttonGroup.style.cssText = `
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    `;
    newBook.appendChild(buttonGroup);

    const changeButton = document.createElement("button");
    changeButton.textContent = isComplete ? "Belum Selesai Dibaca" : "Sudah Dibaca";
    changeButton.style.cssText = `
        width: fit-content;
        border-radius: 16px;
        padding: 6px 12px;
        margin-bottom: 5px;
        margin-left: 5px;
        color: black;
        font-size: 1rem;
        align-self: flex-start;
        cursor: pointer;
    `
    changeButton.addEventListener("click", function () {
        toggleStatusBuku(newBook, changeButton);
    });
    buttonGroup.appendChild(changeButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Hapus";
    deleteButton.style.cssText = `
        width: fit-content;
        border-radius: 16px;
        padding: 6px 12px;
        margin-bottom: 5px;
        margin-right: 5px;
        color: black;
        font-size: 1rem;
        align-self: flex-end;
        cursor: pointer;
    `
    deleteButton.addEventListener("click", function () {
        deleteBook(newBook);
    });
    buttonGroup.appendChild(deleteButton);

    return newBook;
}

function tambahBuku() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const year = document.getElementById("year").value;
    const isComplete = document.getElementById("isComplete").checked;

    const bookshelf = isComplete ? document.getElementById("complete") : document.getElementById("notComplete");
    const newBook = createBook(title, author, year, isComplete);
    
    bookshelf.appendChild(newBook);

    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("year").value = "";
    document.getElementById("isComplete").checked = false;
}

function deleteBook(book) {
    const confirmation = confirm("Apakah Anda yakin ingin menghapus buku ini?");
    if (confirmation) {
        book.remove();
    }
}

function toggleStatusBuku(book, changeButton) {
    const targetBookshelf = book.parentNode.id === "complete" ? document.getElementById("notComplete") : document.getElementById("complete");

    if (changeButton.textContent === "Sudah Dibaca") {
        changeButton.textContent = "Belum Selesai Dibaca";
    } else {
        changeButton.textContent = "Sudah Dibaca";
    }

    targetBookshelf.appendChild(book);
}

function searchBooks() {
    const keyword = document.getElementById("search").value.toLowerCase();
    const allBooks = document.querySelectorAll("li");

    allBooks.forEach(function (books) {
        const booksInfo = books.textContent.toLowerCase();
        if (booksInfo.includes(keyword)) {
            books.style.display = "block";
        } else {
            books.style.display = "none";
        }
    });
}

const formSearch = document.getElementById("form-search");
formSearch.addEventListener("submit", function (event) {
    event.preventDefault();
    searchBooks();
});


const formAdd = document.getElementById("form-add");
formAdd.addEventListener("submit", function (event) {
    event.preventDefault();
    tambahBuku();
});