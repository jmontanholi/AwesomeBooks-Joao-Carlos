/* eslint-disable no-undef */
/* eslint-disable max-classes-per-file */
const submit = document.getElementById('submit');
const title = document.getElementById('title');
const author = document.getElementById('author');
const ulbook = document.getElementById('ulBooks');
const listLink = document.getElementById('list-link');
const addLink = document.getElementById('add-link');
const contactLink = document.getElementById('contact-link');
const listDiv = document.getElementById('list');
const formDiv = document.getElementById('form');
const contactDiv = document.getElementById('contact');

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
    newLi.className += 'row';
    newLi.className += ' books';
    newLi.innerHTML = ` 
        <p class='col-5'>${list.List[i].title}</p>
        <p class='col-5'>${list.List[i].author}</p>
        <button class="removeBtn col-2" id="remove${i}">Remove</button>
        `;
    if (i % 2 === 0) {
      newLi.className += ' books1';
    }
    ulbook.appendChild(newLi);
  }
};

const emptyList = () => {
  if (list.List.length === 0) {
    createList();
    const ulPlaceholder = document.createElement('p');
    ulPlaceholder.innerHTML = 'Please Add a Book to the List';
    ulPlaceholder.setAttribute('id', 'ul-placeholder');
    ulbook.appendChild(ulPlaceholder);
  } else {
    createList();
  }
};

emptyList();

const removeBtnListeners = () => {
  const removeBtn = document.querySelectorAll('li button');
  removeBtn.forEach((e) => {
    e.addEventListener('click', (t) => {
      const id = t.target.id.slice((t.target.id.length - 1), t.target.id.length);
      list.removeBook(id);
      saveLocalstorage();
      emptyList();
      removeBtnListeners();
    });
  });
};

const requireInputs = () => {
  if ((title.value.trim() === '') && (author.value.trim() === '')) {
    title.className += ' error';
    author.className += ' error';
    return false;
  }

  if (title.value.trim() === '') {
    title.className += ' error';
    return false;
  }

  if (author.value.trim() === '') {
    author.className += ' error';
    return false;
  }
  return true;
};

title.addEventListener('change', () => {
  if (title.value.trim() !== '') {
    title.classList.remove('error');
  }
});

author.addEventListener('change', () => {
  if (author.value.trim() !== '') {
    author.classList.remove('error');
  }
});

submit.addEventListener('click', (event) => {
  if (requireInputs()) {
    list.newBook(title.value, author.value);
    saveLocalstorage();
    createList();
    removeBtnListeners();
  } else {
    event.preventDefault();
  }
});

removeBtnListeners();

const clockSelector = document.getElementById('clock');
const test = luxon.DateTime;
const dt = luxon.DateTime.now();
clockSelector.innerHTML = `${dt.toLocaleString(test.DATETIME_MED)}`;

listLink.addEventListener('click', () => {
  listDiv.classList.remove('d-none');
  listDiv.classList.add('d-grid');
  formDiv.classList.remove('d-flex');
  formDiv.classList.add('d-none');
  contactDiv.classList.remove('d-grid');
  contactDiv.classList.add('d-none');
});

addLink.addEventListener('click', () => {
  listDiv.classList.remove('d-grid');
  listDiv.classList.add('d-none');
  formDiv.classList.remove('d-none');
  formDiv.classList.add('d-flex');
  contactDiv.classList.remove('d-grid');
  contactDiv.classList.add('d-none');
});

contactLink.addEventListener('click', () => {
  listDiv.classList.remove('d-grid');
  listDiv.classList.add('d-none');
  formDiv.classList.remove('d-flex');
  formDiv.classList.add('d-none');
  contactDiv.classList.remove('d-none');
  contactDiv.classList.add('d-grid');
});