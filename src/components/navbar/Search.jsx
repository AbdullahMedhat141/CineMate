function Search({ query, setQuery }) {
  return (
    <input
      className="search-input"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export default Search;
