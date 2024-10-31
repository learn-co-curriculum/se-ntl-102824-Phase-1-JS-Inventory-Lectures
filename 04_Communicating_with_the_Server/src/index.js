////////////////////
// global selectors
////////////////////
const toggleBookFormButton = document.querySelector("#toggleForm");
const bookForm = document.querySelector("#book-form");

///////////////////
// helper functions
///////////////////

function formatPrice(price) {
  return "$" + Number.parseFloat(price).toFixed(2);
}

function fillIn(form, data) {
  form.title.value = data.title;
  form.author.value = data.author;
  form.price.value = data.price;
  form.imageUrl.value = data.imageUrl;
  form.inventory.value = data.inventory;
}

fillIn(bookForm, {
  title: "Designing Data-intensive Applications",
  author: "Martin Kleppmann",
  price: 22,
  inventory: 1,
  imageUrl:
    "https://m.media-amazon.com/images/I/51ZSpMl1-LL._SX379_BO1,204,203,200_.jpg",
});

///////////////////
// render functions
///////////////////
function renderHeader(bookStore) {
  document.querySelector("#store-name").textContent = bookStore.name;
}

function renderFooter(bookStore) {
  document.querySelector("#address").textContent = bookStore.address;
  document.querySelector("#number").textContent = bookStore.number;
  document.querySelector("#store").textContent = bookStore.location;
}

function renderAllBooks(inventory) {
  // bookStore.inventory.forEach(book => renderBook(book));
  inventory.forEach(renderBook); // this syntax is shorthand for line above
}

function renderBook(book) {
  const li = document.createElement("li");
  li.className = "list-li";

  const h3 = document.createElement("h3");
  h3.textContent = book.title;
  li.append(h3);

  const pAuthor = document.createElement("p");
  pAuthor.textContent = book.author;
  li.append(pAuthor);

  const pPrice = document.createElement("p");
  pPrice.textContent = formatPrice(book.price);
  li.append(pPrice);

  const pStock = document.createElement("p");
  pStock.className = "grey";
  if (book.inventory === 0) {
    pStock.textContent = "Out of stock";
  } else if (book.inventory < 3) {
    pStock.textContent = "Only a few left!";
  } else {
    pStock.textContent = "In stock";
  }
  li.append(pStock);

  const img = document.createElement("img");
  img.src = book.imageUrl;
  img.alt = `${book.title} cover`;
  li.append(img);

  const btn = document.createElement("button");
  btn.textContent = "Delete";
  li.append(btn);

  btn.addEventListener("click", (e) => {
    li.remove();
  });

  document.querySelector("#book-list").append(li);
}

///////////////////////////////////////////////
// Comm w/ server (via .fetch) -> update DOM
///////////////////////////////////////////////

fetch("http://localhost:3000/books")
  .then((response) => {
    console.dir(response);
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`message: ${response.statusText}`);
    }
  })
  .then((booksArr) => {
    console.log(booksArr);
    renderAllBooks(booksArr);
  })
  .catch((err) => console.error(err));

fetch("http://localhost:3000/stores")
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`message: ${res.statusText}`);
    }
  })
  .then((storesArr) => {
    renderHeader(storesArr[0]);
    renderFooter(storesArr[0]);
  })
  .catch((err) => console.error(err));

////////////////////////////////////////////////////////////////
// Event Listeners/Handlers (Behavior => Data => Display)
////////////////////////////////////////////////////////////////

function toggleBookForm() {
  const bookFormHidden = bookForm.classList.toggle("collapsed");
  if (bookFormHidden) {
    toggleBookFormButton.textContent = "New Book";
  } else {
    toggleBookFormButton.textContent = "Hide Book Form";
  }
}

// hide and show the new book form when toggle buton is clicked
toggleBookFormButton.addEventListener("click", (e) => {
  toggleBookForm();
});

// also hide the form when it's visible and the escape key is pressed
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (!bookForm.classList.contains("collapsed")) {
      toggleBookForm();
    }
  }
});

// handle submitting new book form
bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const book = {
    title: e.target.title.value,
    author: e.target.author.value,
    price: parseFloat(e.target.price.value),
    inventory: parseInt(e.target.inventory.value),
    imageUrl: e.target.imageUrl.value,
    reviews: [],
  };

  e.target.reset(); // clear form
  toggleBookForm(); // hide book form
  renderBook(book); // display new book to DOM
});

////////////////////////////////////////////
// call render functions to populate the DOM
////////////////////////////////////////////

// renderHeader(bookStore)
// renderFooter(bookStore)
// renderAllBooks(bookStore)

console.dir(window);

////////////////////////////
// another example
///////////////////////////

let requestedTodo; // declaring a variable in global scope w/o assignment
console.log("🚀 ~ requestedTodo:", requestedTodo);

const result = fetch("https://jsonplaceholder.typicode.com/todos/2") // fetch returns a Promise
  .then((response) => {
    // Promise result is a Response obj
    console.log(response);
    return response.json(); // .json() returns a Promise
  })
  .then((todoJSON) => {
    // Promise result is JSON
    requestedTodo = todoJSON; // assign result to global variable to get data out of this callback
    console.log("🚀 ~ requestedTodo:", requestedTodo);
  });
console.log("🚀 ~ result:", result);
