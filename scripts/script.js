let submit = document.getElementById('submit')
let title = document.getElementById('title')
let author = document.getElementById('author')
let ulbook = document.getElementById('ulBooks')

let booksArray = []

class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}

let addBooks = (book) => {
    booksArray.push(book)
} 

submit.addEventListener('click', () => {
    let book = new Book(title.value, author.value)
    addBooks(book)
    console.log(booksArray)
    let newLi = document.createElement('li')
    newLi.innerHTML = ` 
    <p>${book.title}</p>
    <p>${book.author}</p>
    `
    ulbook.appendChild(newLi)
})