const Pagination = ({ page, pages, onChange }) => {
  if (pages <= 1) return null;

  const handlePrev = () => onChange(Math.max(page - 1, 1));
  const handleNext = () => onChange(Math.min(page + 1, pages));

  return (
    <div className="pagination">
      <button type="button" className="nav-button ghost" onClick={handlePrev} disabled={page === 1}>
        Previous
      </button>
      <span className="page-indicator">
        Page {page} of {pages}
      </span>
      <button type="button" className="nav-button ghost" onClick={handleNext} disabled={page === pages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
