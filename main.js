const api = `https://www.omdbapi.com/?s=pacific&apikey=c65fcde9&`;
// const api = `https://www.omdbapi.com/?apikey=c65fcde9&i=tt1285016`;

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

      <button
        class="about"
        onclick="openModal(); show('${element.imdbID}')"
      >
        About
      </button>
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

        if (data.Response === "True") {
          showData(data);
        } else {
          box.innerHTML = `
            <h2 style="color: white; font-size: 24px; text-align: center;">
              Not Found
            </h2>
          `;
        }
      })
      .catch((error) => console.log(error));
  });
}

findMovie();

const back = document.querySelector(".back");
const modal = document.querySelector(".modal");

function show(id) {
  fetch(`https://www.omdbapi.com/?apikey=c65fcde9&i=${id}`)
    .then((response) => response.json())
    .then((data) => {
      const {
        Title,
        Year,
        Rated,
        Released,
        Runtime,
        Genre,
        Director,
        Writer,
        Actors,
        Plot,
        Language,
        Country,
        Awards,
        Poster,
        Metascore,
        imdbRating,
        imdbVotes,
        Type,
        BoxOffice,
      } = data;

      if (data.Response === "True") {
        modal.innerHTML = `
        <button class="close" onclick="closeModal()">
          <i class="ri-close-line"></i>
        </button>
          <img src="${Poster}" alt="Salom" class="image" />

          <p class="title2">${Title}</p>
          <p class="year2"><b>Year:</b> ${Year}</p>
          <p class="rated"><b>Rated:</b> ${Rated}</p>
          <p class="released"><b>Released:</b> ${Released}</p>
          <p class="runtime"><b>Runtime:</b> ${Runtime}</p>
          <p class="genre"><b>Genre:</b> ${Genre}</p>
          <p class="director"><b>Director:</b> ${Director}</p>
          <p class="writer"><b>Writer:</b> ${Writer}</p>
          <p class="actors"><b>Actors:</b> ${Actors}</p>
          <p class="plot"><b>Plot:</b> ${Plot}</p>
          <p class="language"><b>Language:</b> ${Language}</p>
          <p class="country"><b>Country:</b> ${Country}</p>
          <p class="awards"><b>Awards:</b> ${Awards}</p>
          <p class="metascore"><b>Metascore:</b> ${Metascore}</p>
          <p class="imdbrating"><b>IMDb Rating:</b> ${imdbRating}</p>
          <p class="imdbvotes"><b>IMDb Votes:</b> ${imdbVotes}</p>
          <p class="type2"><b>Type:</b> ${Type}</p>
          <p class="boxoffice"><b>Box Office:</b> ${BoxOffice}</p>
        `;
      } else {
        console.log("error");
      }
    });
}

function openModal() {
  back.classList.remove("window");
}

function closeModal() {
  back.classList.add("window");
}
