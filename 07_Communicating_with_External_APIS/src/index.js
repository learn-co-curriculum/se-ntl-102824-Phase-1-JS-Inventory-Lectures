const resultsDiv = document.querySelector("#results");
const googleApi = "https://www.googleapis.com/books/v1/volumes?";
document.addEventListener("DOMContentLoaded", () => {
  const apiSearchForm = document.querySelector("#api-Search");

  apiSearchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = encodeURI(e.target.search.value);
    console.log(query);
    // fetchTVMaze(query).then(renderShow);
    getJSON(googleApi + `key=${API_KEY}&q=${query}&maxResults=25`).then(
      (bookInfo) => renderBooks(bookInfo.items)
    );
    e.target.reset()
  });
});

function renderBooks(booksArr) {
  resultsDiv.innerHTML = ""
  booksArr.forEach((book) => {
    const elements = [
      createElement("h1", { textContent: book.volumeInfo.title }),
      createElement("img", {
        src: book.volumeInfo.imageLinks
          ? book.volumeInfo.imageLinks.thumbnail
          : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg",
      }),
      createElement("p", {
        textContent: book.volumeInfo.authors
          ? `by ${book.volumeInfo.authors.join(", ")}`
          : "no authors available",
      }),
      createElement("p", {textContent: book.volumeInfo.description})
    ];
    resultsDiv.append(...elements)
  });
}

// function renderShow(showJSON) {
//   resultsDiv.innerHTML = "";
//   const ep1 = showJSON._embedded.episodes[0];
//   console.log("🚀 ~ renderShow ~ ep1:", ep1);
//   const elements = [
//     createElement("h1", { textContent: showJSON.name }),
//     createElement("img", { src: ep1.image.medium, alt: `${ep1.name} poster` }),
//     createElement("div", { innerHTML: showJSON.summary }),
//     createElement("hr", {}),
//   ];
//   resultsDiv.append(...elements);
//   showJSON._embedded.episodes.forEach((episode) => {
//     const epiElements = [
//       createElement("h2", {
//         textContent: `S${episode.season}E${episode.number}: ${episode.name}`,
//       }),
//       createElement("img", {
//         src: episode.image.medium,
//         alt: `${episode.name} poster`,
//       }),
//       createElement("div", { innerHTML: episode.summary }),
//     ];
//     resultsDiv.append(...epiElements)
//   });
// }

// function fetchTVMaze(query) {
//   return fetch(
//     `https://api.tvmaze.com/singlesearch/shows?q=${query}&embed=episodes`
//   ).then((response) => response.json());
// }
