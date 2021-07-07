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
    newLi.className += 'row';
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

const eventLoop = () => {
  const removeBtn = document.querySelectorAll('li button');
  removeBtn.forEach((e) => {
    e.addEventListener('click', (t) => {
      const id = t.target.id.slice((t.target.id.length - 1), t.target.id.length);
      list.removeBook(id);
      saveLocalstorage();
      emptyList();
      eventLoop();
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
    eventLoop();
  } else {
    event.preventDefault();
  }
});

eventLoop();