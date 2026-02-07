const TagFilter = ({ tags, activeTag, onSelect }) => {
  return (
    <div className="tag-filter">
      {['all', ...tags].map((tag) => (
        <button
          key={tag}
          type="button"
          className={`tag-filter-button ${activeTag === tag ? 'active' : ''}`}
          onClick={() => onSelect(tag)}
        >
          {tag === 'all' ? 'All Tags' : `#${tag}`}
        </button>
      ))}
    </div>
  );
};

export default TagFilter;
