const submit = document.getElementById('submit');
const title = document.getElementById('title');
const author = document.getElementById('author');
const ulbook = document.getElementById('ulBooks');
const booksArray = [];

if (localStorage.getItem('booksArray')) {
  const getBooks = JSON.parse(localStorage.getItem('booksArray'));
  getBooks.forEach((t) => {
    booksArray.push(t);
  });
}

const saveLocalstorage = () => {
  localStorage.setItem('booksArray', JSON.stringify(booksArray));
};

const createList = () => {
  ulbook.innerHTML = '';
  for (let i = 0; i < booksArray.length; i += 1) {
    const newLi = document.createElement('li');
    newLi.innerHTML = ` 
        <p>${booksArray[i].title}</p>
        <p>${booksArray[i].author}</p>
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
      const { id } = t.target;
      booksArray.splice((id.slice((id.length - 1), id.length)), 1);
      saveLocalstorage();
      createList();
      eventLoop();
    });
  });
};

eventLoop();

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

const addBooks = (book) => {
  booksArray.push(book);
};

submit.addEventListener('click', () => {
  const book = new Book(title.value, author.value);
  addBooks(book);
  saveLocalstorage();
  createList();
});
