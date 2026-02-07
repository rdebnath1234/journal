const Loader = ({ label = 'Loading...' }) => {
  return (
    <div className="loader">
      <div className="loader-dot" />
      <span>{label}</span>
    </div>
  );
};

export default Loader;
