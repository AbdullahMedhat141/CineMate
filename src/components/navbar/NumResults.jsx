function NumResults({ movies }) {
  return (
    <p className="num-results">
      <strong>{movies.length}</strong> results
    </p>
  );
}

export default NumResults;
