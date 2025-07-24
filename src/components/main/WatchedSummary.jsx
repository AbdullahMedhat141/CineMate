function WatchedSummary({ watched, showSummary, setShowSummary }) {
  const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20rem",
          marginBottom: "2.4rem",
        }}
      >
        <h2>Watched Summary</h2>
        <button className="btn-close" onClick={() => setShowSummary(false)}>
          x
        </button>
      </div>
      <div className="summury-details">
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⌚</span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}

export default WatchedSummary;
