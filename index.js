const titleInput = document.getElementById("book-title");
const authorInput = document.getElementById("book-author");
const isbnInput = document.getElementById("book-ISBN#");
const submitBtn = document.getElementById("submit");
const bookTableBody = document.querySelector("#book-table tbody");

function getBooksFromStorage() {
  return JSON.parse(localStorage.getItem("books") || "[]");
}

function saveBooksToStorage(books) {
  localStorage.setItem("books", JSON.stringify(books));
}

function displayBooks() {
  const books = getBooksFromStorage();
  books.forEach((book) => {
    addBookToTable(book);
  });
}

function addBookToTable(book) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><button class='deleteButton' onclick='deleteBook(this, "${book.isbn}")'>x</button></td>
  `;
  bookTableBody.appendChild(tr);
}

submitBtn.addEventListener("click", function () {
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const isbn = isbnInput.value.trim();

  if (!title || !author || !isbn) {
    alert("Bi şey yazmadın la");
    return;
  }

  const newBook = { title, author, isbn };

  addBookToTable(newBook);

  const books = getBooksFromStorage();
  books.push(newBook);
  saveBooksToStorage(books);

  titleInput.value = "";
  authorInput.value = "";
  isbnInput.value = "";

  showMessage("Kitap kaydedildi", "green");
});

function deleteBook(button, isbnToDelete) {
  const row = button.closest("tr");
  row.remove();

  const books = getBooksFromStorage();
  const updatedBooks = books.filter((book) => book.isbn !== isbnToDelete);
  saveBooksToStorage(updatedBooks);
  showMessage("Kitap silindi", "red");
}

window.addEventListener("load", displayBooks);

function showMessage(message, color = "green") {
  const box = document.getElementById("message-box");
  box.textContent = message;
  box.style.color = color;
  box.classList.add("show");
  setTimeout(() => {
    box.classList.remove("show");
  }, 2000); // 2 saniye sonra kaybolur
}
