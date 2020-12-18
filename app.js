// Book Class: Represents A book
class Book {
    constructor(title, author, review,rating, genre, date) {
        this.title = title;
        this.author = author;
        this.review = review;
//

this.genre = genre;
//
var dater = Date.parse(date);

const options = { dateStyle: 'full'}
this.date= new Date(dater).toLocaleDateString(undefined, options)
        //


        

       let  rting = rating;


       
       const rrr1 = `<span class="fa fa-star checked"></span>
       <span class="fa fa-star "></span>
       <span class="fa fa-star "></span>
       <span class="fa fa-star"></span>
       <span class="fa fa-star"></span><br>`
       const rrr2 = `<span class="fa fa-star checked"></span>
       <span class="fa fa-star checked"></span>
       <span class="fa fa-star "></span>
       <span class="fa fa-star"></span>
       <span class="fa fa-star"></span><br>`
       const rrr3 = `<span class="fa fa-star checked"></span>
       <span class="fa fa-star checked"></span>
       <span class="fa fa-star checked"></span>
       <span class="fa fa-star"></span>
       <span class="fa fa-star"></span><br>`
       const rrr4 = `<span class="fa fa-star checked"></span>
       <span class="fa fa-star checked"></span>
       <span class="fa fa-star checked"></span>
       <span class="fa fa-star checked"></span>
       <span class="fa fa-star"></span><br>`
       const rrr5 = `<span class="fa fa-star checked"></span>
       <span class="fa fa-star checked"></span>
       <span class="fa fa-star checked"></span>
       <span class="fa fa-star checked"></span>
       <span class="fa fa-star checked"></span>
       <br>
       `
       this.rating = beforerating(rting)
       
        function beforerating(rting) {
       
switch (rting) {
            case "1":
                return rrr1 + " Complete waste of time";
                break;
            case "2":
                return rrr2 + " Fine but not happy with it";
                break;
            case "4":
                return   rrr3 + " Satisfactory, not too bad";
                break;
            case "4":
                return  rrr4 + " Really liked it";
           break;
            case "5":
                return rrr5 +  " Flawless in every way"
                break;

        
}

    

       
        
          
          


        


    }
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
        <td class= "text-center align-middle point"></td>
  <td class= " align-middle point" >${book.title}</td>
  <td class= " align-middle point">${book.author}</td>
  <td class= " align-middle point">${book.review}</td>
  <td class= " align-middle point text-center">${book.rating}</td>
  <td class= " align-middle point">${book.genre}</td>
  <td class= " align-middle point ">${book.date}</td>
  <td class=" align-middle"><a href="#" class="btn btn-outline-light delete  "><span class=""><i class="fas fa-trash fa-lg "></i></span> </a></td>
`;

//<td class=" align-middle"><a href="#" class="btn  delete "><i class="fas fa-trash fa-lg"></i> </a></td>
        list.appendChild(row);
    }

    static deleteBook(el) {
        if (el.classList.contains("delete")) {
            el.parentElement.parentElement.remove();

        }
        else if (el.classList.contains("fas-trash")) {
            el.parentElement.parentElement.parentElement.remove();

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
            setTimeout(() => document.querySelector(".alert").remove(), 2500);
        }
        //clear field
    static clearFields() {
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#review").value = "";
        document.querySelector("#rating").value = "0";
        document.querySelector("#demo").innerHTML= "0";
        document.querySelector("#cased").innerHTML= " / You Have not rated";
        document.querySelector("#genre").value = "";
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
    //var table = $('#tabler').DataTable();
        //prevent default submit
        e.preventDefault();
       
        //Get Form Values
        const title = document.querySelector("#title").value;
        const author = document.querySelector("#author").value;
        const review = document.querySelector("#review").value;


        const rating = document.querySelector("#rating").value;
        const genre = document.querySelector("#genre").value;
        let date = document.querySelector("#date").value;
       
        //validate
        if (title == "" || author == "" || review == "" || rating == "" || rating == "0"  || genre == "" || date == "") {
            UI.showAlert("Please Fill All Fields", "danger");
        } 
       else if (JSON.parse(localStorage.getItem("books")).some(ch => ch.title == title && ch.author == author)) {
          return  UI.showAlert("You've read this book before", "info");
        }
        else {


            //const table = document.querySelector("#tabler");
            //if (table.classList.contains("dataTables_empty")) {
                //console.log("yes");
            //}
           // table
    //.row();
    
    
            
           
            
            //instantiate book
            const book = new Book(title, author, review,rating, genre, date);
            
            UI.addBookToList(book)


            
            //add books to local storage
            store.addBook(book)
            
                
            
            

            //show success
            UI.showAlert("Book Added", "success")
                // clear fields
            UI.clearFields()

            //
            
            
            
            

            }

        


    })
    // Events: Remove Book
document.querySelector("#book-list").addEventListener("click", (e) => {
    //var table = $('#tabler').DataTable();
    
    var result = confirm("Want to delete?");
    console.log(e.target);
    if (result) {
    //show success
    console.log(e.target);
    UI.deleteBook(e.target)

    // remove book from store
    store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    UI.showAlert("Book Delete", "info");
    //table
    //.row()
    //.clear()
    //.draw();
   
    }
});


