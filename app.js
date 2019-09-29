// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Add Book to List
UI.prototype.addBookToList = function(book) {
  const list = document.getElementById("book-list");
  // create tr element
  const row = document.createElement("tr");
  // instert cols
  row.innerHTML = `<td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>`;
  list.appendChild(row);
};

// Show alert
UI.prototype.showAlert = function(msg, className) {
  const div = document.createElement("div");
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(msg));
  const container = document.querySelector(".container");
  const form = document.querySelector("#book-form");
  container.insertBefore(div, form);

  // timeout after 3 sec
  setTimeout(function() {
    document.querySelector(".alert").remove();
  }, 3000);
};

// Delete book
UI.prototype.deleteBook = function(target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};
// Clear fields
UI.prototype.clearFields = function() {
  (document.getElementById("title").value = ""),
    (author = document.getElementById("author").value = ""),
    (isbn = document.getElementById("isbn").value = "");
};

// Event Listeners

// Event Listener for delete
document.getElementById("book-form").addEventListener("submit", function(e) {
  e.preventDefault();

  // get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  // instantiate a book
  const book = new Book(title, author, isbn);

  // instantiate UI
  const ui = new UI();

  // validate input
  if (title === "" || author === "" || isbn === "") {
    // Error alert
    ui.showAlert("Please fill in all fields", "error");
  } else {
    // Add book to list
    ui.addBookToList(book);
    // show success alert
    ui.showAlert("Book Added!", "success");
    // clear fields
    ui.clearFields();
  }
});

// Event Listener for Delete
document.getElementById("book-list").addEventListener("click", function(e) {
  e.preventDefault();
  // instantiate UI
  const ui = new UI();
  // delete book
  ui.deleteBook(e.target);
  // show msg
  ui.showAlert("Book Removed!", "success");
});
