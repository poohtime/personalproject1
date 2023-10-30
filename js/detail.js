//API
const urlParams = new URLSearchParams(window.location.search)
const movieId = urlParams.get("id");
const API_KEY = "66576c6439a06ef7c8f118ab392d6de9";
const API_BASE = "https://api.themoviedb.org/3";
const YOUTUBE_API_KEY = 'AIzaSyANpT9FPrmsspo6I1ZlzJRqOoq-bjRws4I';

//무비 가져오기
const getMovieById = async (movieId) => {
    const response = await fetch(`${API_BASE}/movie/${movieId}?language=en-US&api_key=${API_KEY}`);
    if (response.ok) {
        const movie = await response.json();
        return movie;
    } else {
        return alert("오류입니다!")
    }
}
const getTopRated = async(page = 1 ) => {
    const response = await fetch(`${API_BASE}/movie/top_rated?language=en-US&page=${page}&include_adult=false&api_key=${API_KEY}`);
    if(response.ok) {
      const json = await response.json();
      return json.results;
    }
    return false;
  }
  
//무비 상세보기 카드
  const movieDetail = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get("id");
    const movie = await getMovieById(movieId);
    if (movie) {
        document.getElementById("img").src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        document.getElementById("title").textContent = movie.title;
        document.getElementById("overview").textContent = movie.overview;
        document.getElementById("rating").textContent = `평점 : ${movie.vote_average}`;
        renderTrailer(movie.title);
    } else {
        return alert("오류입니다!");
    }
}
//되돌아가기
const back = document.getElementById("mpbtn")
back.addEventListener("click", function(){
    window.location.href = `index.html`
})
movieDetail();

//유투브 예고편
const renderTrailer = async (title) => {
  if (!title) return;

  const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${title} trailer&key=${YOUTUBE_API_KEY}`);
  const youtubeObj = await res.json();
  const youtubeId = youtubeObj.items[0].id.videoId;
  const youtubeEmbed = `<iframe id="youtube" width="560" height="315" src="https://www.youtube.com/embed/${youtubeId}" title="${youtubeObj.items[0].snippet.title || title + ' trailer'}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
  const youtubeContainer = document.querySelector('.youtube-container');
  youtubeContainer.innerHTML = youtubeEmbed;
  document.querySelector('.trailer-label').after(youtubeContainer);
}

//구독하기 버튼
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
        subscriptionForm.style.display = 'none';
        subscriptionSuccess.style.display = 'block';
    } else {
        emailValidationMessage.style.display = 'block';
    }
});
//이메일 검사
function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
}
