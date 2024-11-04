//////////////////////////////////////////////////////////
// Fetch Data & Call render functions to populate the DOM
//////////////////////////////////////////////////////////
getJSON("http://localhost:3000/stores")
  .then((stores) => {
    // this populates a select tag with options so we can switch between stores on our web page
    renderStoreSelectionOptions(stores);
    renderHeader(stores[0]);
    renderFooter(stores[0]);
  })
  .catch((err) => {
    console.error(err);
    // renderError('Make sure to start json-server!') // I'm skipping this so we only see this error message once if JSON-server is actually not running
  });

// load all the books and render them
getJSON("http://localhost:3000/books")
  .then((books) => {
    books.forEach(renderBook);
  })
  .catch(renderError);

///////////////////
// render functions
///////////////////
function renderHeader(store) {
  document.querySelector("#store-name").textContent = store.name;
}

function renderFooter(bookStore) {
  document.querySelector("#address").textContent = bookStore.address;
  document.querySelector("#number").textContent = bookStore.number;
  document.querySelector("#store").textContent = bookStore.location;
}

const storeSelector = document.querySelector("#store-selector");
// adds options to a select tag that allows swapping between different stores
function renderStoreSelectionOptions(stores) {
  // target the select tag
  // clear out any currently visible options
  storeSelector.innerHTML = "";
  // add an option to the select tag for each store
  stores.forEach(addSelectOptionForStore);
  // add a listener so that when the selection changes, we fetch that store's data from the server and load it into the DOM
  storeSelector.addEventListener("change", (e) => {
    getJSON(`http://localhost:3000/stores/${e.target.value}`).then((store) => {
      renderHeader(store);
      renderFooter(store);
    });
  });
}

function addSelectOptionForStore(store) {
  const option = document.createElement("option");
  // the option value will appear within e.target.value
  option.value = store.id;
  // the options textContent will be what the user sees when choosing an option
  option.textContent = store.name;
  storeSelector.append(option);
}

// appends the li to the ul#book-list in the DOM
const bookList = document.querySelector("#book-list");
function renderBook(book) {
  if (bookEditMode) {
    const li = document.querySelector(`li[data-book-id="${book.id}"]`);
    const next = li.nextSibling;
    const prev = li.previousSibling;
    li.remove();
    const newli = createBookLi(book);
    next
      ? bookList.insertBefore(newli, next)
      : prev.after(newli);
  } else {
    const newli = createBookLi(book);
    bookList.append(newli);
  }

  function createBookLi(book) {
    const li = document.createElement("li");
    li.dataset.bookId = book.id;
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

    const inventoryInput = document.createElement("input");
    inventoryInput.type = "number";
    inventoryInput.className = "inventory-input";
    inventoryInput.value = book.inventory;
    inventoryInput.min = 0;
    li.append(inventoryInput);

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

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
      handleBookEdit(book);
    });
    li.append(editBtn);

    const btn = document.createElement("button");
    btn.textContent = "Delete";

    btn.addEventListener("click", (e) => {
      // fetch(`http://localhost:3000/books/${book.id}`, { method: "DELETE" }) // TODO: add delete fetch to request_helpers
      //   .then((res) => {
      //     if (res.ok) {
      //       li.remove(); // pessimistic rendering
      //     } else {
      //       throw res.statusText;
      //     }
      //   })
      deleteJSON(`http://localhost:3000/books/${book.id}`)
        .then((message) => li.remove())
        .catch(renderError);
      // li.remove(); // optimistic rendering
    });
    li.append(btn);
    return li;
  }
}

// function updateBook(book) { // start of stand-alone book update function, replaced by edit control-flow in renderBook()
//   const li = document.querySelector(`li[data-book-id="${book.id}"]`);

//   console.log("🚀 ~ updateBook ~ li:", li);
//   li.querySelector("h3").textContent = book.title;
//   li.querySelectorAll("p").forEach();
// }

function renderError(error) {
  const main = document.querySelector("main");
  const errorDiv = document.createElement("div");
  errorDiv.className = "error";
  if (error.message === "Failed to fetch") {
    errorDiv.textContent =
      "Whoops! Looks like you forgot to start your JSON-server!";
  } else {
    errorDiv.textContent = error;
  }
  main.prepend(errorDiv);
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      errorDiv.remove();
    }
  });
}

function fillIn(form, data) {
  for (field in data) {
    if (form[field]) {
      form[field].value = data[field];
    }
  }
}

// New Function to populate the store form with a store's data to update
function populateStoreEditForm(store) {
  const form = document.querySelector("#store-form");
  form.dataset.storeId = store.id;
  fillIn(form, store);
  showStoreForm();
}

function handleBookEdit(book) {
  console.log("🚀 ~ handleBookEdit ~ book:", book)
  bookForm.dataset.bookId = book.id;
  bookForm.querySelector("input[type='submit']").value = "UPDATE BOOK"
  fillIn(bookForm, book);
  showBookForm();
  bookEditMode = true;
}

function formatPrice(price) {
  let formattedPrice = Number.parseFloat(price).toFixed(2);
  return `$${formattedPrice}`;
}

// Event Handlers

// Book Form button
const toggleBookFormButton = document.querySelector("#toggleBookForm");
const bookForm = document.querySelector("#book-form");
let bookFormVisible = false;

function toggleBookForm() {
  fillIn(bookForm, {
    title: "Designing Data-Intenseive Applications",
    author: "Martin Kleppmann",
    price: 22.2,
    imageUrl:
      "https://m.media-amazon.com/images/I/51ZSpMl1-LL._SX379_BO1,204,203,200_.jpg",
    inventory: 1,
  });
  if (bookFormVisible) {
    hideBookForm();
  } else {
    showBookForm();
  }
}

function showBookForm() {
  bookFormVisible = true;
  bookForm.classList.remove("collapsed");
  toggleBookFormButton.textContent = "Hide Book form";
}

function hideBookForm() {
  bookFormVisible = false;
  bookForm.classList.add("collapsed");
  toggleBookFormButton.textContent = "New Book";
}

toggleBookFormButton.addEventListener("click", toggleBookForm);

// Store Form button
const toggleStoreFormButton = document.querySelector("#toggleStoreForm");
const storeForm = document.querySelector("#store-form");
let storeFormVisible = false;

function toggleStoreForm() {
  if (storeFormVisible) {
    hideStoreForm();
  } else {
    showStoreForm();
  }
}

function hideStoreForm() {
  document.querySelector("#store-form").classList.add("collapsed");
  storeFormVisible = false;
  storeEditMode = false;
  storeForm.reset();
  toggleStoreFormButton.textContent = "New Store";
}

function showStoreForm() {
  document.querySelector("#store-form").classList.remove("collapsed");
  storeFormVisible = true;
  toggleStoreFormButton.textContent = "Hide Store form";
  storeForm.querySelector('[type="submit"]').value = storeEditMode
    ? "SAVE STORE"
    : "ADD STORE";
}

toggleStoreFormButton.addEventListener("click", toggleStoreForm);

// allow escape key to hide either form
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    hideStoreForm();
    hideBookForm();
  }
});
let bookEditMode = false;
// book form submit
bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // pull the info for the new book out of the form
  const book = {
    title: e.target.title.value,
    author: e.target.author.value,
    price: e.target.price.value,
    reviews: [],
    inventory: Number(e.target.inventory.value),
    imageUrl: e.target.imageUrl.value,
  };
  if (bookEditMode) {
    patchJSON(
      `http://localhost:3000/books/${e.target.dataset.bookId}`,
      book
    ).then((updatedBook) => {
      renderBook(updatedBook);
      bookEditMode = false;
      hideBookForm();
      bookForm.querySelector("button").textContent = "ADD BOOK"
      e.target.reset();
    });
  } else {
    postJSON("http://localhost:3000/books", book)
      .then((book) => {
        renderBook(book);
        e.target.reset();
      })
      .catch(renderError);
  }

  // pessimistic rendering here:
});

// store form submit

storeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const store = {
    name: e.target.name.value,
    address: e.target.address.value,
    number: e.target.number.value,
    hours: e.target.hours.value,
    location: e.target.location.value,
  };

  if (storeEditMode) {
    // ✅ write code for updating the store here
    patchJSON(
      `http://localhost:3000/stores/${e.target.dataset.storeId}`,
      store
    ).then((updatedStore) => {
      renderHeader(updatedStore);
      renderFooter(updatedStore);
      storeSelector.querySelector(
        `option[value="${updatedStore.id}"]`
      ).textContent = updatedStore.name;
    });
  } else {
    postJSON("http://localhost:3000/stores", store)
      .then(addSelectOptionForStore)
      .catch(renderError);
  }
  hideStoreForm();
  e.target.reset();
});

// edit store button
const editStoreBtn = document.querySelector("#edit-store");
let storeEditMode = false;

editStoreBtn.addEventListener("click", (e) => {
  const selectedStoreId = document.querySelector("#store-selector").value;
  storeEditMode = true;
  getJSON(`http://localhost:3000/stores/${selectedStoreId}`).then(
    populateStoreEditForm
  );
});
