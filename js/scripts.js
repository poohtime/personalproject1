//API 
const API_KEY = '66576c6439a06ef7c8f118ab392d6de9';
const API_BASE = 'https://api.themoviedb.org/3';

// await쓸때는 async 같이써야함
const getTopRated = async(page) => {
  const response = await fetch(`${API_BASE}/movie/top_rated?language=en-US&page=${page}&include_adult=false&api_key=${API_KEY}`);
  if(response.ok) {
    const json = await response.json();
    return json.results;
  }
  return false;
}
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
  const movies = await getTopRated();
  if(!movies) return;
// 카드선택했을때 아이디나오게 하기
  const cardsEl = document.querySelector('.cards');
  const searchInputEl = document.getElementById('search');
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
  searchInputEl.addEventListener ('keyup', event => {
  if(event.key === 'Enter') {
    console.log('enterpressed');
    search();
  }
  });
  document.querySelector('.search-btn').addEventListener('click', search);
}


init();

document.getElementById("navbar-fixed").innerHTML = `
<nav class="navbar navbar-expand-lg navbar-light bg-white">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-mdb-toggle="collapse"
        data-mdb-target="#navbarExample01"
        aria-controls="navbarExample01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="fas fa-bars"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarExample01">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item active">
          <a class="nav-link" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Features</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Pricing</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">About</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="p-5 text-center bg-light head">
      <h1 class="mb-3">내배캠 최고 평점 영화 콜렉션</h1>
      <button id="subscribeButton">구독하기</button>
      <div id="subscriptionForm" style="display: none;">
        <label for="email">이메일:</label>
        <input type="email" id="email" required>
        <button id="confirmSubscription">확인</button>
        <p id="emailValidationMessage" style="display: none; color: red;">유효하지 않은 이메일 주소입니다.</p>
    </div>

    <div id="subscriptionSuccess" style="display: none;">
    <button >구독완료</button>
    </div>
    </div>
`;
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
document.getElementById("footer-fixed").innerHTML = `
<footer class="text-center text-lg-start bg-white text-muted">
    <!-- Section: Social media -->
    <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
      <!-- Left -->
      <div class="me-5 d-none d-lg-block">
        <span>Get connected with us on social networks:</span>
      </div>
      <!-- Left -->
  
      <!-- Right -->
      <div>
        <a href="" class="me-4 link-secondary">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a href="" class="me-4 link-secondary">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="" class="me-4 link-secondary">
          <i class="fab fa-google"></i>
        </a>
        <a href="" class="me-4 link-secondary">
          <i class="fab fa-instagram"></i>
        </a>
        <a href="" class="me-4 link-secondary">
          <i class="fab fa-linkedin"></i>
        </a>
        <a href="" class="me-4 link-secondary">
          <i class="fab fa-github"></i>
        </a>
      </div>
      <!-- Right -->
    </section>
    <!-- Section: Social media -->
  
    <!-- Section: Links  -->
    <section class="">
      <div class="container text-center text-md-start mt-5">
        <!-- Grid row -->
        <div class="row mt-3">
          <!-- Grid column -->
          <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
            <!-- Content -->
            <h6 class="text-uppercase fw-bold mb-4">
              <i class="fas fa-gem me-3 text-secondary"></i>내배캠 최고 평점 영화
            </h6>
            <p>
              Here you can use rows and columns to organize your footer content. Lorem ipsum
              dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>
          <!-- Grid column -->
  
          <!-- Grid column -->
          <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <!-- Links -->
            <h6 class="text-uppercase fw-bold mb-4">
              Products
            </h6>
            <p>
              <a href="#!" class="text-reset">Angular</a>
            </p>
            <p>
              <a href="#!" class="text-reset">React</a>
            </p>
            <p>
              <a href="#!" class="text-reset">Vue</a>
            </p>
            <p>
              <a href="#!" class="text-reset">Laravel</a>
            </p>
          </div>
          <!-- Grid column -->
  
          <!-- Grid column -->
          <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            <!-- Links -->
            <h6 class="text-uppercase fw-bold mb-4">
              Useful links
            </h6>
            <p>
              <a href="#!" class="text-reset">Pricing</a>
            </p>
            <p>
              <a href="#!" class="text-reset">Settings</a>
            </p>
            <p>
              <a href="#!" class="text-reset">Orders</a>
            </p>
            <p>
              <a href="#!" class="text-reset">Help</a>
            </p>
          </div>
          <!-- Grid column -->
  
          <!-- Grid column -->
          <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <!-- Links -->
            <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
            <p><i class="fas fa-home me-3 text-secondary"></i> Seoul , KOREA 10012, US</p>
            <p>
              <i class="fas fa-envelope me-3 text-secondary"></i>
              info@example.com
            </p>
            <p><i class="fas fa-phone me-3 text-secondary"></i> + 01 234 567 88</p>
            <p><i class="fas fa-print me-3 text-secondary"></i> + 01 234 567 89</p>
          </div>
          <!-- Grid column -->
        </div>
        <!-- Grid row -->
      </div>
    </section>
    <!-- Section: Links  -->
  
    <!-- Copyright -->
    <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.025);">
      © 2021 Copyright:
      <a class="text-reset fw-bold" href="https://mdbootstrap.com/">MDBootstrap.com</a>
    </div>
    <!-- Copyright -->
</footer>
`;