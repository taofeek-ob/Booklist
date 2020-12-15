// Book Class: Represents A book
class Book {
    constructor(title, author, review, date) {
        this.title = title;
        this.author = author;
        this.review = review;

        let dater = new Date(date)
        this.date = dater.toDateString()
    }
}

// for date
let today = new Date().toISOString().substr(0, 10);
document.querySelector("#date").value = today;
// UI Class: Handles UI task
class UI {
    static displayBooks() {

        const books = store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }
    static addBookToList(book) {
        const list = document.querySelector("#book-list");
        const row = document.createElement("tr");

        row.innerHTML = `
  <td class= "text-center align-middle"></td>
  <td class= "text-center align-middle">${book.title}</td>
  <td class= "text-center align-middle">${book.author}</td>
  <td class= "text-center align-middle">${book.review}</td>
  <td class= "text-center align-middle">${book.date}</td>
  <td class="text-center align-middle"><a href="#" class="btn btn-danger btn-sm delete" onclick = "return confirm('Are You Sure You Want To Delete This Item');">X</a></td>
`;


        list.appendChild(row);
    }

    static deleteBook(el) {
        if (el.classList.contains("delete")) {
            el.parentElement.parentElement.remove();

        }
    }

    static showAlert(message, className) {
            const div = document.createElement("div")
            div.className = `alert alert-${className}`
            const container = document.querySelector(".container")
            const form = document.querySelector("#book-form")
            container.insertBefore(div, form)
            div.appendChild(document.createTextNode(message))
                //make showAlert vanish
            setTimeout(() => document.querySelector(".alert").remove(), 1000);
        }
        //clear field
    static clearFields() {
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#review").value = "";
        document.querySelector("#date").value = today;

    }

};

//Store Class:Handles storage
class store {


    //get book
    static getBooks() {
            let books;
            if (localStorage.getItem("books") === null) {
                books = [];
            } else {
                books = JSON.parse(localStorage.getItem("books"));
            }
            return books;
        }
        //add book
    static addBook(book) {
        const books = store.getBooks()
        books.push(book)
        localStorage.setItem("books", JSON.stringify(books))

    }


    //remove book
    static removeBook(date) {
        const books = store.getBooks()
        books.forEach((book, index) => {

            if (book.date === date) {
                books.splice(index, 1);
            }

        });
        localStorage.setItem("books", JSON.stringify(books))
    }
}
//Display Book
document.addEventListener("DOMContentLoaded", UI.displayBooks);
// Events: add Book
document.querySelector("#book-form").addEventListener("submit", (e) => {

        //prevent default submit
        e.preventDefault();
        //Get Form Values
        const title = document.querySelector("#title").value;
        const author = document.querySelector("#author").value;
        const review = document.querySelector("#review").value;
        let date = document.querySelector("#date").value;

        //validate
        if (title == "" || author == "" || review == "" || date == "") {
            UI.showAlert("Please Fill All Fields", "danger");
        } else {
            //instantiate book
            const book = new Book(title, author, review, date);
            UI.addBookToList(book)

            //add books to local storage
            store.addBook(book)

            //show success
            UI.showAlert("Book Added", "success")
                // clear fields
            UI.clearFields()

        }


    })
    // Events: Remove Book
document.querySelector("#book-list").addEventListener("click", (e) => {


    //show success
    UI.deleteBook(e.target)

    // remove book from store
    store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    UI.showAlert("Book Delete", "info")
})