import { useEffect, useState } from "react";
import Search from "./components/navbar/Search";
import NumResults from "./components/navbar/NumResults";
import MovieDetails from "./components/main/MovieDetails";
import Box from "./components/main/Box";
import WatchedSummary from "./components/main/WatchedSummary";
import Loader from "./ui/Loader";
import ErrorMessage from "./ui/ErrorMessage";
import Main from "./components/main/Main";
import MoviesList from "./components/main/MoviesList";
import WatchedMoviesList from "./components/main/WatchedMoviesList";
import Header from "./components/navbar/Header";

const KEY = "da99fde5";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [watched, setWatched] = useState(function () {
    const storedValue = localStorage.getItem("watched");
    return JSON.parse(storedValue);
  });

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }
  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((watched) => watched.imdbID !== id));
  }

  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) throw new Error("Faild to fetch");
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found!");
          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      handleCloseMovie();
      document.addEventListener("keydown", (e) => {
        if (e.code === "Enter") fetchMovies();
      });
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <div className="container">
      <Header />
      <div className="search-box">
        <div className="search">
          <Search query={query} setQuery={setQuery} />
          <NumResults movies={movies} />
        </div>
        <button
          onClick={() => setShowSummary(true)}
          className="watched-summary-btn"
        >
          Watched Summary
        </button>
      </div>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading &&
            !error &&
            (selectedId ? (
              <MovieDetails
                selectedId={selectedId}
                onCloseMovie={handleCloseMovie}
                onAddWatched={handleAddWatched}
                watched={watched}
                KEY={KEY}
              />
            ) : (
              <MoviesList movies={movies} onSelectMovie={handleSelectMovie} />
            ))}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {!showSummary ? (
            <WatchedMoviesList
              watched={watched}
              onDeleteWatched={handleDeleteWatched}
            />
          ) : (
            <WatchedSummary
              watched={watched}
              showSummary={showSummary}
              setShowSummary={setShowSummary}
            />
          )}
        </Box>
      </Main>
    </div>
  );
}
