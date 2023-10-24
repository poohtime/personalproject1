//API
const API_KEY = "66576c6439a06ef7c8f118ab392d6de9";
const API_BASE = "https://api.themoviedb.org/3";

// await쓸때는 async 같이써야함
const getTopRated = async (page) => {
  const response = await fetch(
    `${API_BASE}/movie/top_rated?language=en-US&page=${page}&include_adult=false&api_key=${API_KEY}`
  );
  if (response.ok) {
    const json = await response.json();
    return json.results;
  }
  return false;
};
// 카드만들기
const cardBuilder = (id, poster_src, title, overview, rating) => {
  return `<div id="movie_${id}" class="img-wrapper">
      <img
      src="https://image.tmdb.org/t/p/w500${poster_src}"
      class="card-img-top"
      alt="${title} poster"
      />
    </div>
    <div class="card-body">
      <h3 class="rating">Rating: ${rating}</h3>
      <h2 class="card-title">${title}</h2>
      <p class="card-text">${overview}</p>
    </div>`;
};
// 검색했을때 다른카드들을 숨기기
const search = () => {
  const keyword = document.getElementById("search").value;
  const movieCards = document.querySelectorAll(".card");
  if (!keyword) {
    movieCards.forEach((card) => card.classList.remove("hide"));
    return;
  } else {
    movieCards.forEach((card) => card.classList.add("hide"));
  }
  const matchedMovies = [...movieCards].filter((card) =>
    card.querySelector(".card-title").textContent.toLowerCase().includes(keyword.toLowerCase())
  );
  console.log("here", matchedMovies);
  matchedMovies.forEach((movie) => movie.classList.remove("hide"));
};

const init = async () => {
  const movies = await getTopRated();
  if (!movies) return;
  // 카드선택했을때 아이디나오게 하기
  const cardsEl = document.querySelector(".cards");
  movies.forEach((movie) => {
    const cardEl = document.createElement("div");
    cardEl.classList.add("card");
    cardEl.innerHTML = cardBuilder(movie.id, movie.poster_path, movie.title, movie.overview, movie.vote_average);
    cardEl.addEventListener("click", () => {
      window.location.href = `detail.html?id=${movie.id}`;
    });
    cardsEl.append(cardEl);
  });
  document.getElementById("search").focus();
  document.querySelector(".search-btn").addEventListener("click", search);
};
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");
fetch(`${API_BASE}/movie/${movieId}?api_key=${API_KEY}&language=en-US`)
  .then((response) => response.json())
  .then((movie) => {
    const detailCard = document.querySelector(".detailcard");
    detailCard.innerHTML = cardBuilder(movie.id, movie.poster_path, movie.title, movie.overview, movie.vote_average);
  })
  .catch((error) => {
    console.error("영화 정보를 가져오지 못했습니다.", error);
  });

init();
