//API
const API_KEY = '66576c6439a06ef7c8f118ab392d6de9';
const API_BASE = 'https://api.themoviedb.org/3';
let page = 1;

const selectElement = document.getElementById('select');
selectElement.addEventListener('change', async () => {
  const selectedOption = selectElement.value;
        console.log(selectedOption)
  const API_URL = `${API_BASE}/movie/${selectedOption}?language=en-US&page=${page}&include_adult=false&api_key=${API_KEY}`;

  const movies = await getMovies(API_URL);
  renderMovies(movies);
});

//영화 데이터 가져오기
const getMovies = async (url) => {
  let response = await fetch(url);
  if (response.ok) {
    const json = await response.json();
    return json.results;
  }
  return [];
};

//렌더링
const renderMovies = (movies) => {
  const cardsEl = document.querySelector('.cards');
  cardsEl.innerHTML = ''; // Clear previous content

  movies.forEach(movie => {
    const cardEl = document.createElement('div');
    cardEl.classList.add('card');
    cardEl.innerHTML = cardBuilder(movie.id, movie.poster_path, movie.title, movie.overview, movie.vote_average);
    cardEl.addEventListener("click", () => {
      window.location.href = `detail.html?id=${movie.id}`;
    });
    cardsEl.append(cardEl);
  });
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
}
// 검색했을때 다른카드들을 숨기기
const search = () => {
  const keyword = document.getElementById('search').value;
  const movieCards = document.querySelectorAll('.card');
  if (!keyword) {
    movieCards.forEach(card => card.classList.remove('hide'));
    return;
  } else {
    movieCards.forEach(card => card.classList.add('hide'));
  }
  const matchedMovies = [...movieCards].filter(card =>
    card.querySelector('.card-title').textContent.toLowerCase().includes(keyword.toLowerCase()));  console.log('here', matchedMovies);
  matchedMovies.forEach(movie => movie.classList.remove('hide'));
}
const input = document.getElementById("myInput");



const init = async() => {
  const selectedOption = selectElement.value; // 현재 선택된 값 가져오기
  const API_URL = `${API_BASE}/movie/${selectedOption}?language=en-US&page=${page}&include_adult=false&api_key=${API_KEY}`;

  try {
    const movies = await getMovies(API_URL); // 영화 데이터 가져오기
    if (!movies) return;

    const cardsEl = document.querySelector('.cards');
    const searchInputEl = document.getElementById('search');

    cardsEl.innerHTML = ''; // Clear the previous content

    movies.forEach(movie => {
      const cardEl = document.createElement('div');
      cardEl.classList.add('card');
      cardEl.innerHTML = cardBuilder(movie.id, movie.poster_path, movie.title, movie.overview, movie.vote_average);
      cardEl.addEventListener("click", () => {
        window.location.href = `detail.html?id=${movie.id}`;
      });
      cardsEl.append(cardEl);
    });

    searchInputEl.focus();
    searchInputEl.addEventListener('keyup', event => {//엔터키 활성화
      if (event.key === 'Enter') {
        search();
      }
    });
    document.querySelector('.search-btn').addEventListener('click', search);
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};

init();

const subscribeButton = document.getElementById('subscribeButton');
const subscriptionForm = document.getElementById('subscriptionForm');
const emailInput = document.getElementById('email');
const confirmSubscriptionButton = document.getElementById('confirmSubscription');
const subscriptionSuccess = document.getElementById('subscriptionSuccess');
const emailValidationMessage = document.getElementById('emailValidationMessage');

subscribeButton.addEventListener('click', function() {
    subscribeButton.style.display = 'none';
    subscriptionForm.style.display = 'block';
});

confirmSubscriptionButton.addEventListener('click', function() {
    const enteredEmail = emailInput.value;
    if (validateEmail(enteredEmail)) {
        // 여기에서 이메일을 처리하거나 저장할 수 있습니다.
        // 이 부분을 실제 서버로 전송하는 로직으로 대체해야 할 수 있습니다.

        subscriptionForm.style.display = 'none';
        subscriptionSuccess.style.display = 'block';
    } else {
        emailValidationMessage.style.display = 'block';
    }
});

function validateEmail(email) {
    // 간단한 이메일 유효성 검사를 수행합니다.
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
}
