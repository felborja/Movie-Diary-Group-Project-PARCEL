// Start Felipes Js part

// Execute the script after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Get the container for favorite movies
  const favoriteMoviesContainer = document.getElementById("favorite-movies");

  // Function to load favorite movies from localStorage
  function loadFavoriteMovies() {
    // Retrieve the favorite movies from localStorage
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // If there are no favorite movies, display a message
    if (!favorites.length) {
      favoriteMoviesContainer.innerHTML = `
      <div class="flex flex-col gap-6">
        <p class="text-gray-700">No favorite movies added yet.</p>
        <a href="index.html" class="text-blue-500 underline">Go back to the Movies</a>
      </div>
      `;
      return;
    }

    // Clear the container if there are favorite movies
    favoriteMoviesContainer.innerHTML = "";

    // Create and append a movie item for each favorite movie
    favorites.forEach((movie) => {
      const movieItem = createMovieItem(movie);
      favoriteMoviesContainer.appendChild(movieItem);
    });
  }

  // Function to create a movie item element
  function createMovieItem(movie) {
    const movieItem = document.createElement("div");
    movieItem.classList.add(
      "bg-white",
      "p-4",
      "rounded-lg",
      "shadow-md",
      "flex",
      "flex-col",
      "h-full"
    );

    const moviePoster = document.createElement("img");
    moviePoster.src = `https://image.tmdb.org/t/p/w220_and_h330_face${movie.poster_path}`;
    moviePoster.alt = movie.title;
    moviePoster.classList.add("w-full", "h-auto", "rounded-lg", "mb-4");

    const movieTitle = document.createElement("h2");
    movieTitle.textContent = movie.title;
    movieTitle.classList.add("text-xl", "font-bold", "mb-2");

    const movieOverview = document.createElement("p");
    movieOverview.textContent = movie.overview;
    movieOverview.classList.add("text-gray-700", "mt-2", "text-[14px]", "mb-4");

    // Load and display the comment if it exists
    const comment = loadComment(movie.id);
    movieOverview.textContent = comment ? `"${comment}"` : movie.overview;

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("mt-auto", "gap-2", "flex", "flex-col");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete from Favorites";
    deleteButton.classList.add(
      "bg-red-500",
      "text-white",
      "p-2",
      "rounded",
      "w-full"
    );

    const addCommentsButton = document.createElement("button");
    addCommentsButton.textContent = "Add Comments";
    addCommentsButton.classList.add(
      "bg-blue-300",
      "text-white",
      "p-2",
      "rounded",
      "w-full"
    );

    // Add event listener to delete the movie from favorites
    deleteButton.addEventListener("click", () => deleteFromFavorites(movie.id));

    // Add event listener to add comments to the movie
    addCommentsButton.addEventListener("click", function () {
      const comment = prompt("What do you think about the movie?");
      if (comment) {
        saveComment(movie.id, comment);
        movieOverview.textContent = `"${comment.replace(/"/g, '\\"')}"`;
        movieOverview.classList.add(
          "text-gray-700",
          "mt-2",
          "text-[14px]",
          "italic",
          "mb-4"
        );
      }
    });

    buttonContainer.appendChild(deleteButton);
    buttonContainer.appendChild(addCommentsButton);

    movieItem.appendChild(moviePoster);
    movieItem.appendChild(movieTitle);
    movieItem.appendChild(movieOverview);
    movieItem.appendChild(buttonContainer);

    return movieItem;
  }

  // Function to delete a movie from favorites
  function deleteFromFavorites(movieId) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter((movie) => movie.id !== movieId);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    loadFavoriteMovies(); // Reload the favorite movies list
  }

  // Function to load a comment for a movie from localStorage
  function loadComment(movieId) {
    const comments = JSON.parse(localStorage.getItem("comments")) || {};
    return comments[movieId] || null;
  }

  // Function to save a comment for a movie to localStorage
  function saveComment(movieId, comment) {
    const comments = JSON.parse(localStorage.getItem("comments")) || {};
    comments[movieId] = comment;
    localStorage.setItem("comments", JSON.stringify(comments));
  }

  // Load favorite movies when the script runs
  loadFavoriteMovies();
});
// End Felipes Js part

// Start of Search Engine

// Execute the script after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector(".search-input");
  const dropdown = document.getElementById("dropdown-container");

  // Event listener for search input click
  searchInput.addEventListener("click", async (event) => {
    console.log("Search input clicked");
    event.stopPropagation(); // Prevent immediate hiding

    dropdown.style.display = "block";
    console.log("Dropdown displayed");

    // Fetch popular movies from the API
    let page = 1;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMWY1ODhiNDQ3MDc1MDQxN2FlMWExMTRmYzhmZjgyYyIsInN1YiI6IjY2NjYxODRmZjE1OTlhZWQyNzYyYjkxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JTzNe9K6zUQWUYhqnM8Re8sqtM8aK9TLVzmGq0dCH0c",
      },
    };

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
        options
      );
      const data = await response.json();
      console.log("Movies fetched", data);

      // Clear the dropdown
      const favoriteMoviesList = document.getElementById(
        "favorite-movies-list"
      );
      favoriteMoviesList.innerHTML = "";

      // Populate the dropdown with movie titles
      data.results.forEach((movie) => {
        const movieContainer = document.createElement("div");
        movieContainer.classList.add(
          "p-2",
          "flex",
          "justify-between",
          "items-center",
          "p-6"
        );

        const movieTitle = document.createElement("div");
        movieTitle.textContent = movie.title;
        movieTitle.classList.add("hover:bg-gray-200", "cursor-pointer");

        const favoriteButton = document.createElement("button");
        favoriteButton.textContent = "Add to Favorite";
        favoriteButton.classList.add(
          "bg-green-500",
          "text-white",
          "p-2",
          "rounded"
        );

        // Event listener to add the movie to favorites
        favoriteButton.addEventListener("click", () => {
          addToFavorites(movie);
          displayMovieOnPage(movie); // Display the added movie immediately
        });

        movieContainer.appendChild(movieTitle);
        movieContainer.appendChild(favoriteButton);
        favoriteMoviesList.appendChild(movieContainer);
      });
    } catch (err) {
      console.error("Error fetching movies", err);
    }

    // Function to add a movie to favorites
    function addToFavorites(movie) {
      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      if (!favorites.some((favorite) => favorite.id === movie.id)) {
        favorites.push(movie);
        localStorage.setItem("favorites", JSON.stringify(favorites));
      } else {
        alert(`${movie.title}" is already in favorites.`);
      }
    }

    // Function to display a movie on the page
    function displayMovieOnPage(movie) {
      const favoriteMoviesContainer =
        document.getElementById("favorite-movies");
      const movieItem = createMovieItem(movie);
      favoriteMoviesContainer.appendChild(movieItem);
    }
  });

  // Hide the dropdown when the user clicks outside of it
  document.addEventListener("click", (event) => {
    console.log("Document clicked");
    if (
      !searchInput.contains(event.target) &&
      !dropdown.contains(event.target)
    ) {
      dropdown.style.display = "none";
      console.log("Dropdown hidden");
    }
  });
});
// End of Search Engine

// Start Sebastians Js part

// End Sebastians Js part

// Start Amarbayars Js part

// End Amarbayars Js part
