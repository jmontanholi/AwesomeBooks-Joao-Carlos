let submit = document.getElementById('submit')
let title = document.getElementById('title')
let author = document.getElementById('author')
let ulbook = document.getElementById('ulBooks')
let booksArray = []

if (localStorage.getItem('booksArray')) {
    const getBooks = JSON.parse(localStorage.getItem('booksArray'));
    getBooks.forEach((t) => {
      booksArray.push(t);
    });
}

const saveLocalstorage = () => {
    localStorage.setItem('booksArray', JSON.stringify(booksArray));
};

let createList = () => {
    ulbook.innerHTML = ''
    for(let i = 0; i < booksArray.length; i++) {
        let newLi = document.createElement('li')
        newLi.innerHTML = ` 
        <p>${booksArray[i].title}</p>
        <p>${booksArray[i].author}</p>
        <button id="remove${i}">Remove Book</button>
        `
        ulbook.appendChild(newLi)
    }
}

createList()

let eventLoop = () => {
    let removeBtn = document.querySelectorAll('li button')
    removeBtn.forEach(function(e){
        e.addEventListener('click', (t) => {
            let id = t.target.id
            booksArray.splice((id.slice((id.length -1), id.length)), 1)
            saveLocalstorage()
            createList()
            eventLoop()
        })
    })
}

eventLoop()

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
    saveLocalstorage()
    createList()
})
