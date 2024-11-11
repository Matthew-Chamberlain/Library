

class Book
{
    #author;
    #title;
    #pageNumber;
    #read;
    static id = 0;
    #bookID;
    constructor(title, author, pageNumber, read)
    {
        this.#title = title;
        this.#author = author;
        this.#pageNumber = pageNumber;
        this.#read = read;
        this.#bookID = Book.id;
        Book.id++;
    }

    getTitle()
    {
        return this.#title;
    }

    getAuthor()
    {
        return this.#author;
    }

    getPageNumber()
    {
        return this.#pageNumber;
    }

    isRead()
    {
       return this.#read;
    }

    setRead(value)
    {
        this.#read = value;
    }

    getID()
    {
        return this.#bookID;
    }
}
class Library
{
    #bookList;
    constructor()
    {
        this.#bookList = [];
    }    

    addBook(newBook)
    {
        this.#bookList.push(newBook);
        console.log("ID: " + newBook.getID());
    }

    removeBook(id)
    {
        this.#bookList.pop(this.getBook(id));
        this.displayLibrary();
    }   

    getBook(id)
    {
        for(let i = 0; i < this.#bookList.length; i++)
        {
            if(this.#bookList[i].getID() == id)
            {
                return this.#bookList[i];
            }
        }
    }

    getBookList()
    {
        return this.#bookList;
    }

    displayLibrary()
    {
        clearBookGrid();
        for(let i = 0; i < this.#bookList.length; i++)
        {
            createBookCard(this.#bookList[i]);
        }
    }

}

library = new Library();
const dialog = document.querySelector("dialog")

function showDialog()
{
    dialog.showModal();
}

function closeDialog()
{
    dialog.close();
}

function createBook()
{
    console.log("book submitted");
    let form = document.querySelector("#bookForm");
    let title = document.querySelector("#title");
    let author = document.querySelector("#author");
    let pageNumber = document.querySelector("#pageNumber");
    let read = document.querySelector("#readBox");
    
    library.addBook(new Book(title.value, author.value, pageNumber.value, read.checked));
    library.displayLibrary();
    form.reset();
}

function createBookCard(book)
{
    const bookGrid = document.querySelector("#content");
    
    const bookCard = document.createElement("div");
    bookCard.classList.add("book");
    
    const title = document.createElement("h3")
    title.textContent = "Title: " + book.getTitle();
    
    const author = document.createElement("h3")
    author.textContent = "Author: " + book.getAuthor();
    
    const pageNumber = document.createElement("h3")
    pageNumber.textContent = "No of Pages: " + book.getPageNumber();
    
    const readButton = document.createElement("button");
    readButton.classList.add("readButton");
    if(book.isRead())
    {
        readButton.style.backgroundColor = "#91c68e";
    }
    else
    {
        readButton.style.backgroundColor = "#b35750"
    }
    readButton.textContent = "Book Read";

    const removeButton = document.createElement("button")
    removeButton.classList.add("removeButton");
    removeButton.textContent = "Remove";

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pageNumber);
    bookCard.appendChild(readButton);
    bookCard.appendChild(removeButton);
    bookGrid.appendChild(bookCard);

    readButton.addEventListener("click", function()
    {
        if(book.isRead())
        {
            book.setRead(false);
            readButton.style.backgroundColor = "#b35750"; 
            readButton.textContent = "Book not read"
        }
        else
        {
            book.setRead(true);
            readButton.style.backgroundColor = "#91c68e";
            readButton.textContent = "Book read"
        }
    });
    
    removeButton.addEventListener("click", function()
    {
        library.removeBook(book.getID());
    });
    
    
}

function clearBookGrid()
{
    const bookGrid = document.querySelector("#content");
    while(bookGrid.firstChild)
    {
        bookGrid.removeChild(bookGrid.lastChild);
    }
}


