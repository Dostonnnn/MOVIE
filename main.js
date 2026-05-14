const api = `https://www.omdbapi.com/?s=Panda&apikey=c65fcde9&`;
const box = document.querySelector(".box");

function getData(api) {
  box.innerHTML = "Loading...";
  fetch(api, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      box.innerHTML = "";
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
