/* eslint-disable max-classes-per-file */
const submit = document.getElementById('submit');
const title = document.getElementById('title');
const author = document.getElementById('author');
const ulbook = document.getElementById('ulBooks');
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class List {
  constructor() {
    this.List = [];
  }

  newBook(title, author) {
    const book = new Book(title, author);
    this.List.push(book);
  }

  removeBook(id) {
    this.List.splice(id, 1);
  }
}

const list = new List();

if (localStorage.getItem('booksArray')) {
  const getBooks = JSON.parse(localStorage.getItem('booksArray'));
  getBooks.forEach((t) => {
    list.List.push(t);
  });
}

const saveLocalstorage = () => {
  localStorage.setItem('booksArray', JSON.stringify(list.List));
};

const createList = () => {
  ulbook.innerHTML = '';
  for (let i = 0; i < list.List.length; i += 1) {
    const newLi = document.createElement('li');
    newLi.innerHTML = ` 
        <p>${list.List[i].title}</p>
        <p>${list.List[i].author}</p>
        <button id="remove${i}">Remove Book</button>
        `;
    ulbook.appendChild(newLi);
  }
};

createList();

const eventLoop = () => {
  const removeBtn = document.querySelectorAll('li button');
  removeBtn.forEach((e) => {
    e.addEventListener('click', (t) => {
      const id = t.target.id.slice((t.target.id.length - 1), t.target.id.length);
      list.removeBook(id);
      saveLocalstorage();
      createList();
      eventLoop();
    });
  });
};

submit.addEventListener('click', () => {
  list.newBook(title.value, author.value);
  saveLocalstorage();
  createList();
  eventLoop();
});

eventLoop();
