const urlParams = new URLSearchParams(window.location.search)
const movieId = urlParams.get("id");
const API_KEY = "66576c6439a06ef7c8f118ab392d6de9";
const API_BASE = "https://api.themoviedb.org/3";

const getMovieId = async (movieId) => {
    const response = await fetch(`${API_BASE}/movie/${movieId}?language=ko-kr&api_key=${API_KEY}`);
    if (response.ok) {
        const movie = await response.json();
        return movie;
    } else {
        return alert("오류입니다!")
    }
}

const movieDetail = async () => {
    const movie = await getMovieId(movieId);
    if (movie) {
        document.getElementById("img").src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        document.getElementById("title").textContent = movie.title
        document.getElementById("overview").textContent = movie.overview
        document.getElementById("rating").textContent = `평점 : ${movie.vote_average}`
    } else {
        return alert("오류입니다!")
    }
}
const back = document.getElementById("mpbtn")
back.addEventListener("click", function(){
    window.location.href = `index.html`
})
movieDetail();