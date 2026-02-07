const SearchBar = ({ value, onChange, onSubmit }) => {
  return (
    <form className="search-bar" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Search posts, tags, topics..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <button type="submit" className="nav-button">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
