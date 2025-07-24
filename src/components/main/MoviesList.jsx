import Movie from "./Movie";

function MoviesList({ movies, onSelectMovie }) {
  return (
    <ul className="list-movies list">
      {movies?.map((movie, index) => (
        <Movie
          movie={movie}
          key={`${movie.imdbID}-${index}`}
          onSelectMovie={onSelectMovie}
        />
      ))}
    </ul>
  );
}

export default MoviesList;
