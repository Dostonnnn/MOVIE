const api = `https://www.omdbapi.com/?s=pacific&apikey=c65fcde9&`;
const box = document.querySelector(".box");
const load = document.createElement("span");
const input = document.querySelector(".search");
const form = document.querySelector("form");
load.className = "loader";
box.appendChild(load);
function getData(api) {
  fetch(api, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      load.style.display = "none";
      showData(data);
    })
    .catch((error) => console.log(error))
    .finally(console.log("Natijalar tugadi"));
}
getData(api);
function showData(movie) {
  const { Search } = movie;
  Search.forEach((element) => {
    const card = document.createElement("div");
    card.className = "card";
    let title = element.Title;
    if (title.length >= 20) {
      title = element.Title.slice(0, 20);
    }
    const type = element.Type;
    const year = element.Year;
    const poster = element.Poster;
    card.innerHTML = `
            <h2 class="title">${title}</h2>
            <span class="year">${year}</span>
            <span class="type">${type}</span>
            <img src="${poster}" alt="" class="poster" />
          `;
    box.appendChild(card);
  });
}
function findMovie() {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    input.style.width = "250px";
    const movieName = input.value.trim();
    const answer = `https://www.omdbapi.com/?s=${movieName}&apikey=c65fcde9&`;
    fetch(answer)
      .then((response) => response.json())
      .then((data) => {
        box.innerHTML = "";
        showData(data);
      })
      .catch((error) => console.log(error));
  });
}
findMovie();
