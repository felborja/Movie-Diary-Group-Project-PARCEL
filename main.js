// Start Sebastians Js part

// Selecting the Input field from the HTML document through a querySelector
const searchInput = document.querySelector("[data-search]");

// Adding an Event Listener to the Input field previously selected. Also saving the value of the user input in a variable and transforming it to lower case letters.
searchInput.addEventListener('input', e => { 
    const value = e.target.value.toLowerCase();

// A function looping through all the movies and checking if the value of the User input is included in the Movies Title.
// If the Search Input value is not included in the movie title, the function will add "Display: hidden" to the movie Card and the Movie wont be displayed. 
    allMovies.forEach(movie => {
        const movieId = document.getElementById(movie.id);
        if (movie.title.toLowerCase().includes(value)) {
            movieId.classList.remove("hidden");
        } else {
            movieId.classList.add("hidden");
        }
    });
});

// A funtion that will remove the display:hidden class from all movies, so that if the user presses the reset button all movies will be shown again.
function showAllMovies() {
    allMovies.forEach(movie => {
        const movieId = document.getElementById(movie.id);
        movieId.classList.remove("hidden");
    });
}

// Adding a Event listener to the reset button and the calling the function to show all movies when the reset button is operated.
const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', e => {
    showAllMovies();
});

/* These are four functions, each for one genre. When one of the genre buttons is pressed, the funtion loops through all movies and checks if the genre of the movie is equal to the
 genre selected. If so the movie will be displayed, if else the class display : hideen will be added and the movie will be not be shown. */
const genreAction =document.querySelector('#action');
genreAction.addEventListener('click', e => {
    allMovies.forEach(movie => {
        const movieId = document.getElementById(movie.id);
        if (movie.genre_ids.length == 3) {
            movieId.classList.remove("hidden");
        } else {
            movieId.classList.add("hidden");
        }
    })
} )

const genreDrama =document.querySelector('#drama');
genreDrama.addEventListener('click', e => {
    allMovies.forEach(movie => {
        const movieId = document.getElementById(movie.id);
        if (movie.genre_ids.length == 4) {
            movieId.classList.remove("hidden");
        } else {
            movieId.classList.add("hidden");
        }
    })
} )

const genreComedy =document.querySelector('#comedy');
genreComedy.addEventListener('click', e => {
    allMovies.forEach(movie => {
        const movieId = document.getElementById(movie.id);
        if (movie.genre_ids.length == 5) {
            movieId.classList.remove("hidden");
        } else {
            movieId.classList.add("hidden");
        }
    })
} )

const genreSciFi =document.querySelector('#sciFi');
genreSciFi.addEventListener('click', e => {
    allMovies.forEach(movie => {
        const movieId = document.getElementById(movie.id);
        if (movie.genre_ids.length == 3) {
            movieId.classList.remove("hidden");
        } else {
            movieId.classList.add("hidden");
        }
    })
} )

// creating a array with all the movies that will later take the response from the fetch request.
let allMovies = [];
// End Sebastians Js part

// Start Amarbayars Js part
//
//
let page = 1;
// page number is set to 1 for fetching the first page of movies
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMWY1ODhiNDQ3MDc1MDQxN2FlMWExMTRmYzhmZjgyYyIsInN1YiI6IjY2NjYxODRmZjE1OTlhZWQyNzYyYjkxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JTzNe9K6zUQWUYhqnM8Re8sqtM8aK9TLVzmGq0dCH0c",
  },
};
//
// fetch popular movies for the home page
fetch(
  `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
  options
)
  .then((response) => response.json())
  .then((response) => {
    allMovies = response.results;
    appendMovies(allMovies);
  })
  .catch((err) => console.error(err));
//
// Append movies for home page

function appendMovies(movies) {
  console.log(movies);
// log the movies to the console for debuging
  const movieList = document.getElementById("movie-list");
  movieList.innerHTML = "";

  movies.forEach((movie) => {
    // item
    const movieItem = document.createElement("div");
    //create container div for each movie item
    movieItem.classList.add("bg-white", "p-4", "rounded-lg", "shadow-md");
    movieItem.id = movie.id;
    // poster
    const moviePoster = document.createElement("img");
    //create img element for the movie poster
    moviePoster.src = `https://image.tmdb.org/t/p/w220_and_h330_face${movie.poster_path}`;
    moviePoster.alt = movie.title;
    //set the src attribute to poster url with width=220, height=330
    moviePoster.classList.add("w-full", "h-auto", "rounded-lg");
    // title
    const movieTitle = document.createElement("h2");
    //create h2 element for the movie title
    movieTitle.textContent = movie.title;
    movieTitle.classList.add("text-xl", "font-bold", "mb-2");
    // overview
    const movieOverview = document.createElement("p");
    //create p element for movie overview
    movieOverview.textContent = movie.overview;
    movieOverview.classList.add("text-gray-700", "mt-2", "text-[10px]");
    // favorite button
    const favoriteButton = document.createElement("button");
    //create button to add movie to favorites
    favoriteButton.textContent = "Add to Favorites";
    favoriteButton.classList.add(
      "bg-green-500",
      "text-white",
      "p-2",
      "rounded",
      "mt-2"
    );
    //add event listener to handle click events
    favoriteButton.addEventListener("click", () => addToFavorites(movie));
    //append poster,title,overview and favorite button to movie item
    movieItem.appendChild(moviePoster);
    movieItem.appendChild(movieTitle);
    movieItem.appendChild(movieOverview);
    movieItem.appendChild(favoriteButton);
    //append movie item to movie list
    movieList.appendChild(movieItem);
  });
}
// favorites button function to add movie to favorite list
function addToFavorites(movie) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
//retrieve existing favorites from local storage or initialize empty array
  if (!favorites.some((favorite) => favorite.id === movie.id)) {
//check if the movie is not already in favorites list
    favorites.push(movie);
//add movie to the favorite list
    localStorage.setItem("favorites", JSON.stringify(favorites));
//save the updated favorites list to local storage
  } else {
    alert(`${movie.title}" is already in favorites.`);
//alert the user if the movies is already in the favorites list
  }
}

// End Amarbayars Js part
