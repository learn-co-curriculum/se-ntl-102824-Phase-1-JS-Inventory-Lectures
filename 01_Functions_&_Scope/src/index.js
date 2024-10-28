//Data
const inventory = [
  {
    id: 1,
    title: "Eloquent JavaScript: A Modern Introduction to Programming",
    author: "Marjin Haverbeke",
    price: 10.0,
    reviews: [
      { userID: 1, content: "Good book, but not great for new coders" },
    ],
    inventory: 10,
    imageUrl:
      "https://images-na.ssl-images-amazon.com/images/I/51IKycqTPUL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg",
  },
  {
    id: 2,
    title: "JavaScript & JQuery: Interactive Front-End Web Development",
    author: "Jon Duckett",
    price: 45.75,
    reviews: [{ userID: 15, content: "good way to learn JQuery" }],
    inventory: 2,
    imageUrl:
      "https://images-na.ssl-images-amazon.com/images/I/31SRWF+LkKL._SX398_BO1,204,203,200_.jpg",
  },
  {
    id: 3,
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    price: 36.0,
    reviews: [
      { userID: 25, content: "I disagree with everything in this book" },
      { userID: 250, content: "Only JS book anyone needs" },
    ],
    inventory: 8,
    imageUrl:
      "https://images-na.ssl-images-amazon.com/images/I/5131OWtQRaL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg",
  },
  {
    id: 4,
    title: "JavaScript: The Definitive Guide",
    author: "David Flanagan",
    price: 25.5,
    reviews: [
      { userID: 44, content: "Great intro to js book" },
      { userID: 350, content: "It really is the Definitive guide" },
    ],
    inventory: 0,
    imageUrl:
      "https://images-na.ssl-images-amazon.com/images/I/51wijnc-Y8L._SX379_BO1,204,203,200_.jpg",
  },
  {
    id: 5,
    title: "You Don’t Know JS",
    author: "Kyle Simpson",
    price: 6.0,
    reviews: [
      {
        userID: 76,
        content: "You can find this for free online, no need to pay for it!",
      },
    ],
    inventory: 7,
    imageUrl:
      "https://images-na.ssl-images-amazon.com/images/I/41T5H8u7fUL._SX331_BO1,204,203,200_.jpg",
  },
  {
    id: 6,
    title: "Learn Enough JavaScript to Be Dangerous",
    author: "Michael Hartl",
    price: 24.0,
    reviews: [{ userID: 50, content: "pretty good" }],
    inventory: 5,
    imageUrl:
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQyf6xSyTHc7a8mx17ikh6GeTohc88Hn0UgkN-RNF-h4iOwVlkW",
  },
  {
    id: 7,
    title: "Cracking the Coding Interview",
    author: "Gayle Laakmann McDowell",
    price: 49.95,
    reviews: [
      {
        userID: 99,
        content:
          "One of the most helpful books for taking on the tech interview",
      },
      {
        userID: 20,
        content: "Great but I just wish it was in JavaScript instead of Java",
      },
    ],
    inventory: 20,
    imageUrl:
      "https://images-na.ssl-images-amazon.com/images/I/41oYsXjLvZL._SY344_BO1,204,203,200_.jpg",
  },
];

// ✅ Function ideas:
/*
- helloWorld
- formatPrice(price)
- blurb(book)
*/

// Start here!

function helloWorld() {
  return "Hello, world!";
}
console.log("🚀 ~ helloWorld:", helloWorld());

function helloFriend(nameStr) {
  // return "Hello, " + nameStr + "!" // string concatenation
  return `Hello, ${nameStr.toUpperCase()}!`; // string interpoltion
}

console.log(helloFriend("Nem"));
console.log(helloFriend("Kelsey"));

// function formatPrice(price) {
//   return "$" + Number.parseFloat(price).toFixed(2)
// }

// 💡 Arrow functions vs regular functions

// ✅ create an arrow function version of the formatPrice function

const formatPrice = (price) => "$" + Number.parseFloat(price).toFixed(2); // implicit return
const formatEuro = (price) => "€" + Number.parseFloat(price).toFixed(2); // implicit return
console.log(formatPrice("12"));
console.log(formatEuro("12.2234"));

// ✅ create a blurb() function that accepts a book as an argument and logs a message in the following format:
// 'Eloquent JavaScript: A Modern Introduction to Programming by Marjin Haverbeke is on sale for $10.00'

const sampleBook = {
  id: 1,
  title: "Eloquent JavaScript: A Modern Introduction to Programming",
  author: "Marjin Haverbeke",
  price: 10.0,
  reviews: [{ userID: 1, content: "Good book, but not great for new coders" }],
  inventory: 10,
  imageUrl:
    "https://images-na.ssl-images-amazon.com/images/I/51IKycqTPUL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg",
};

function blurb(bookObj) {
  const title = bookObj.title;
  const author = bookObj["author"];
  const price = formatPrice(bookObj.price);
  // console.log(`${title} by ${author} is on sale for ${price}`)
  return `${title} by ${author} is on sale for ${price}`;
}

console.log(blurb(sampleBook));
console.log(blurb(inventory[1]));

// 💡 Difference between Block scope, Function scope, and Global scope

// ✅ create a variable `highestPricedBook`

let highestPricedBook;

// ✅ create a function `findHighestPricedBook` that finds that book and returns it

function findHighestPricedBook(bookArr) {
  highestPricedBook = bookArr[0];
  for (let bookObj of bookArr) {
    if (highestPricedBook.price < bookObj.price) {
      highestPricedBook = bookObj;
    }
  }
  return highestPricedBook;
}

console.log(findHighestPricedBook(inventory));

// After Break

// ✅ Create a function called `log` that takes a function and its argument as arguments
// and logs a message explaining the name of the function, the argument passed and
// the return value

// 💡 Practice using callbacks for iteration

console.dir(inventory);
// inventory.forEach(bookObj => blurb(bookObj))
inventory.forEach(blurb);

// ✅ Create an array of the prices of all of the books

const bookPrices = inventory.map((bookObj) => bookObj.price);
const bookAuthors = inventory.map((bookObj) => bookObj.author);
console.log("🚀 ~ bookAuthors:", bookAuthors);
console.log("🚀 ~ bookPrices:", bookPrices);

// ✅ Create an array of simplified book objects

const simpleBooks = inventory.map((bookObj) => {
  return {
    title: bookObj.title,
    author: bookObj.author,
    price: formatPrice(bookObj.price),
  };
});
console.log("🚀 ~ simpleBooks ~ simpleBooks:", simpleBooks);

// ✅ Create an array of strings from the inventory in the following format:
// 'Eloquent JavaScript: A Modern Introduction to Programming by Marjin Haverbeke is on sale for $10.00'

const allBlurbs = inventory.map(blurb);
// const allBlurbs = inventory.map(element => blurb(element))
console.log("🚀 ~ allBlurbs:", allBlurbs);

// 💡 When do I use forEach vs map?
// forEach for when I just want to call a function on every element in an array
// map is for wnen I want to build a new array based on an existing array (tranformative)

function printBlurbs() {
  inventory.forEach((book) => console.log(blurb(book)));
}
printBlurbs();

const cheapBook = inventory.find((book) => book.price < 10);
console.log("🚀 ~ cheapBook:", cheapBook);

const allCheapBooks = inventory.filter((book) => book.price < 20);
console.log("🚀 ~ allCheapBooks:", allCheapBooks);

// >>>>>>>>>>>>>>>>>>>>>>>>
// Building a map function from scratch
// >>>>>>>>>>>>>>>>>>>>>>>>

function myMap(array, cb) {
  const newArray = [];
  for (let elem of array) {
    newArray.push(cb(elem));
  }
  return newArray;
}

const squareMe = (num) => num * num;
const cubeMe = (num) => num ** 3;

const squares = myMap([1, 2, 3, 4], squareMe);
console.log(squares);
const cubes = myMap([1, 2, 3, 4], cubeMe);
console.log(cubes);

// comparing with the built-in Array.prototype.map() function

const squares2 = [5, 6, 7].map(squareMe);
console.log(squares2);
