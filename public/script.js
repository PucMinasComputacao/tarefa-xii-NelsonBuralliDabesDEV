const API_KEY = "7ba7382c5d687af7217d3a6f4823623c";
const movieList = document.getElementById("movie-list");
const message = document.getElementById("message");
const searchInput = document.getElementById("search");
const btnSearch = document.getElementById("btnSearch");
const API_URL = "https://api.themoviedb.org/3/movie/now_playing";
const SEARCH_URL = "https://api.themoviedb.org/3/search/movie";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

async function fetchMovies(query = "") {
  showMessage("Carregando filmes...");
  try {
    let url = `${API_URL}?api_key=${API_KEY}&language=pt-BR`;
    if (query !== "") {
      url = `${SEARCH_URL}?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(query)}`;
    }
    console.log("URL usada:", url);
    const response = await fetch(url);
    const data = await response.json();
    showMessage("");
    return data.results;
  } catch (error) {
    showMessage("Erro ao carregar os filmes.");
    console.error("Erro:", error);
    return [];
  }
}

function createMovieCard(movie) {
  const card = document.createElement("div");
  card.classList.add("movie-card");
  const poster = document.createElement("img");
  poster.classList.add("movie-poster");
  if (movie.poster_path) {
    poster.src = IMAGE_BASE_URL + movie.poster_path;
    poster.alt = movie.title;
    card.appendChild(poster);
  }
  const title = document.createElement("h3");
  title.classList.add("movie-title");
  title.textContent = movie.title;
  const year = document.createElement("p");
  year.classList.add("movie-year");
  if (movie.release_date) {
    year.textContent = "Ano: " + movie.release_date.substring(0, 4);
  } else {
    year.textContent = "Ano: não informado";
  }
  const rating = document.createElement("p");
  rating.classList.add("movie-rating");
  rating.textContent = "Nota: " + movie.vote_average.toFixed(1);
  const overview = document.createElement("p");
  overview.classList.add("movie-overview");
  if (movie.overview) {
    if (movie.overview.length > 120) {
      overview.textContent = movie.overview.substring(0, 120) + "...";
    } else {
      overview.textContent = movie.overview;
    }
  } else {
    overview.textContent = "Sinopse não disponível.";
  }
  card.appendChild(title);
  card.appendChild(year);
  card.appendChild(rating);
  card.appendChild(overview);
  return card;
}

function renderMovies(movies) {
  movieList.innerHTML = "";
  if (!movies || movies.length === 0) {
    showMessage("Nenhum filme encontrado.");
    return;
  }
  showMessage("");
  movies.forEach(function (movie) {
    const card = createMovieCard(movie);
    movieList.appendChild(card);
  });
}

function showMessage(text) {
  message.textContent = text;
}

async function searchMovies() {
  const query = searchInput.value.trim();
  const movies = await fetchMovies(query);
  renderMovies(movies);
}
btnSearch.addEventListener("click", searchMovies);
searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    searchMovies();
  }
});

async function init() {
  const movies = await fetchMovies();
  renderMovies(movies);
}
init();


  
